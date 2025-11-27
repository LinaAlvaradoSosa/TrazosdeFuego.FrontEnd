import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AdmiServiceService } from '../../services/admi-service.service';

interface MensajeContacto {
  _id: string;
  nombre: string;
  correo: string;
  celular?: string;
  mensaje: string;
  createdAt?: string;
}

@Component({
  selector: 'app-admin-contactos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-contactos.component.html',
  styleUrls: ['./admin-contactos.component.css']
})
export class AdminContactosComponent {

  mensajes: MensajeContacto[] = [];
  loading: boolean = false;

  // 🔹 paginación
  pagina: number = 1;
  limite: number = 5;
  totalPaginas: number = 1;

  constructor(private adminService: AdmiServiceService) {}

  ngOnInit(): void {
    this.cargarMensajes();
  }

  cargarMensajes() {
    this.loading = true;

    this.adminService.getMessages(this.pagina, this.limite).subscribe({
      next: (res: any) => {
        // soporta dos formatos:
        // 1) { ok, mensaje: [...], totalPaginas }
        // 2) [ ... ] directo (sin paginación)
        if (Array.isArray(res)) {
          this.mensajes = res;
          this.totalPaginas = 1;
        } else {
          this.mensajes = res?.mensaje || [];
          this.totalPaginas = res?.totalPaginas || 1;
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar mensajes:', err);
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar mensajes',
          text: 'No se pudieron cargar los mensajes. Intenta nuevamente.'
        });
      }
    });
  }

  paginaAnterior() {
    if (this.pagina > 1) {
      this.pagina--;
      this.cargarMensajes();
    }
  }

  paginaSiguiente() {
    if (this.pagina < this.totalPaginas) {
      this.pagina++;
      this.cargarMensajes();
    }
  }

  deleteMessage(id: string) {
    Swal.fire({
      title: '¿Estás segura?',
      text: 'Este mensaje se eliminará definitivamente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#85B185',
      cancelButtonColor: '#9E3329',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.adminService.deleteMessage(id).subscribe({
          next: () => {
            // si borro el último de la página y no es la primera,
            // retrocedo una página para que no quede vacía
            if (this.mensajes.length === 1 && this.pagina > 1) {
              this.pagina--;
            }
            this.cargarMensajes();

            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El mensaje fue eliminado correctamente.'
            });
          },
          error: (err) => {
            console.error('Error al borrar mensaje:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error al borrar',
              text: err.error?.error || 'No se pudo borrar el mensaje. Intenta de nuevo.'
            });
          }
        });
      }
    });
  }
}

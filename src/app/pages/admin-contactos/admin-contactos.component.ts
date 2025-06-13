import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdmiServiceService } from '../../services/admi-service.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { log } from 'console';

@Component({
  selector: 'app-admin-contactos',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-contactos.component.html',
  styleUrl: './admin-contactos.component.css'
})
export class AdminContactosComponent {

  mensajes!:any
  constructor(private admiService: AdmiServiceService){}

  ngOnInit(){
    this.admiService.getMessages().subscribe({
    next: (resApi: any) => {
      this.mensajes = resApi.mensaje;
    },
    error: (error: any) => {
      console.log(error);
    }
    })
  }
  deleteMessage(id: string) {
    Swal.fire({
        title: "¿Estas seguro que quieres eliminar este mensaje?",
        text: "No podras revertir esta accion despues",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2C5E91",
        cancelButtonColor: "#B4120C",
        confirmButtonText: "Si!, quiero borrarlo"
      }).then((result) => {
        if (result.isConfirmed) {
            this.admiService.deleteMessage(id).subscribe({
                next:(resApi:any)=> {
                    this.ngOnInit()
                    Swal.fire({
                        title: "Borrado!",
                        text: "Tu mensaje ha sido borrado",
                        icon: "success"
                      });
                },
                error:(error:any)=>{
                    console.log(error);
                }
            })
        }
      });
  }

}

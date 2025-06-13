import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Producto } from '../../core/Interfaces/riducto.interface';
import { CatalogoService } from '../../services/catalogo.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './admin-productos.component.html',
  styleUrl: './admin-productos.component.css'
})
export class AdminProductosComponent {

  productos: Producto[] =[]

  constructor(private ProductsService: CatalogoService){}

  ngOnInit() : void {
    this.ProductsService.getProducts().subscribe((res: any[])=>{
      this.productos = res;
    })
  }

  deleteProduct(id: string) {
    Swal.fire({
        title: "¿Estas seguro que quieres eliminar este producto?",
        text: "No podrás revertir esta acción después",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#85B185",
        cancelButtonColor: "#9E3329",
        confirmButtonText: "Sí!, quiero borrarlo"
      }).then((result) => {
        if (result.isConfirmed) {
          this.ProductsService.deleteProduct(id).subscribe({
              next:(resApi:any)=> {
                  this.ngOnInit()
                  Swal.fire({
                    title: "Borrado!",
                    text: "Tu producto ha sido borrado",
                    icon: "success"
                  });
              },error:(error:any)=>{
                  console.log(error);
                }
            })
          }
        });
  }

  producto = {
    nombre: '',
    tipo: ''
  };

  archivo: File | null = null;

  onFileChange(event: any) {
    this.archivo = event.target.files[0];
  }

  obtenerUrlCloudinary(imagen: string): string {
    if(imagen.startsWith('http')) {
      return imagen; // ya es URL completa
    }
    return `https://res.cloudinary.com/tu_cuenta/image/upload/v1234567890/trazos-de-fuego/${imagen}`;
  }
  

  crear() {
    if (!this.producto.nombre || !this.producto.tipo) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor llena todos los campos antes de crear el producto.'
      });
      return;
    }
  
    const formData = new FormData();
    formData.append('nombre', this.producto.nombre);;
    formData.append('tipo', this.producto.tipo);
  
    if (this.archivo) {
      formData.append('imagen', this.archivo);
    }
  
    this.ProductsService.crearProducto(formData).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: '¡Producto creado!',
          text: 'El producto se ha guardado exitosamente.'
        });
        this.producto = { nombre: '', tipo: '' };
        this.archivo = null;
        this.ngOnInit();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.error || 'Ocurrió un error al crear el producto.'
        });
        console.error('Error al crear producto:', err);
      }
    });
  }

}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Producto, ProductosPaginados } from '../../core/Interfaces/producto.interface';
import { CatalogoService } from '../../services/catalogo.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent {

  productos: Producto[] = [];
  archivo: File | null = null;
  previewUrl: string | null = null;
  loading: boolean = false;

  // búsqueda
  busqueda: string = '';
  enBusqueda: boolean = false;
  resultadosBusqueda: Producto[] = [];

  // tipos válidos para el select
  tiposProducto: string[] = [
    'accesorios',
    'artilleria',
    'aviacion',
    'caballeria',
    'comunicaciones',
    'esculturas-militares',
    'espro',
    'infanteria',
    'ingenieros',
    'inteligencia',
    'logistica'
  ];

  // 🔹 Paginación
  pagina: number = 1;
  limite: number = 8;
  totalPaginas: number = 1;

  constructor(private ProductsService: CatalogoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  // 👉 Lo que se muestra en la tabla: o resultados de búsqueda o la página normal
  get productosMostrados(): Producto[] {
    if (this.enBusqueda) {
      return this.resultadosBusqueda;
    }
    return this.productos;
  }

  cargarProductos() {
    this.ProductsService.getProducts(this.pagina, this.limite).subscribe({
      next: (res: ProductosPaginados) => {
        this.productos = res.data;
        this.totalPaginas = res.totalPaginas;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar productos',
          text: 'No se pudieron cargar los productos. Intenta de nuevo más tarde.'
        });
      }
    });
  }

  paginaAnterior() {
    if (this.pagina > 1) {
      this.pagina--;
      this.cargarProductos();
    }
  }

  paginaSiguiente() {
    if (this.pagina < this.totalPaginas) {
      this.pagina++;
      this.cargarProductos();
    }
  }

  deleteProduct(id: string) {
    Swal.fire({
      title: "¿Estás segura que quieres eliminar este producto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#85B185",
      cancelButtonColor: "#9E3329",
      confirmButtonText: "Sí, borrar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.ProductsService.deleteProduct(id).subscribe({
          next: () => {
            // si estoy en búsqueda, recargo la búsqueda; si no, la página normal
            if (this.enBusqueda && this.busqueda.trim()) {
              this.onBusquedaChange();
            } else {
              this.cargarProductos();
            }

            Swal.fire({
              title: "Borrado",
              text: "El producto fue eliminado.",
              icon: "success"
            });
          },
          error: (error) => {
            console.error('Error al borrar producto:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error al borrar',
              text: error.error?.error || 'No se pudo borrar el producto. Intenta de nuevo.'
            });
          }
        });
      }
    });
  }

  // Formulario de creación
  producto = {
    nombre: '',
    tipo: ''
  };

  obtenerUrlCloudinary(imagen: string): string {
    if (imagen.startsWith('http')) {
      return imagen;
    }
    return `http://localhost:3000/uploads/${imagen}`;
  }

  onFileChange(event: any) {
    this.archivo = event.target.files[0] || null;

    if (!this.archivo) {
      this.previewUrl = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(this.archivo);
  }

  crear() {
    console.log('👇 Ejecutando crear() con:', this.producto, this.archivo);

    if (!this.producto.nombre || !this.producto.tipo) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor llena todos los campos.'
      });
      return;
    }

    if (!this.archivo) {
      Swal.fire({
        icon: 'warning',
        title: 'Falta la imagen',
        text: 'Selecciona una imagen para el producto.'
      });
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.producto.nombre);
    formData.append('tipo', this.producto.tipo);
    formData.append('imagen', this.archivo);

    this.loading = true;

    this.ProductsService.crearProducto(formData).subscribe({
      next: (res) => {
        console.log('✅ Res API crearProducto:', res);
        Swal.fire({
          icon: 'success',
          title: '¡Producto creado!',
          text: 'El producto ha sido guardado.'
        });

        // volvemos a la primera página para ver el producto nuevo
        this.pagina = 1;
        this.cargarProductos();

        // reset form
        this.producto = { nombre: '', tipo: '' };
        this.archivo = null;
        this.previewUrl = null;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al crear producto (front):', err);
        this.loading = false;
        const msg =
          err.error?.error ||
          err.error?.message ||
          'Ocurrió un error al crear el producto. Intenta de nuevo.';
        Swal.fire({
          icon: 'error',
          title: 'Error al crear',
          text: msg
        });
      }
    });
  }

  // 🔍 Buscar en toda la base de datos
  onBusquedaChange() {
    const termino = this.busqueda.trim();

    if (!termino) {
      // si limpio el input, vuelvo a modo normal
      this.enBusqueda = false;
      this.resultadosBusqueda = [];
      // recargo la página actual por si se borró algo
      this.cargarProductos();
      return;
    }

    this.enBusqueda = true;

    this.ProductsService.buscarProductosPorNombre(termino).subscribe({
      next: (res: Producto[]) => {
        this.resultadosBusqueda = res;
      },
      error: (err) => {
        console.error('Error en búsqueda:', err);
        this.enBusqueda = false;
        Swal.fire({
          icon: 'error',
          title: 'Error en la búsqueda',
          text: 'No se pudieron buscar productos. Intenta de nuevo.'
        });
      }
    });
  }
}

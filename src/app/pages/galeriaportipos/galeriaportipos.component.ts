import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CatalogoService } from '../../services/catalogo.service';
import { CommonModule } from '@angular/common';
import { Producto } from '../../core/Interfaces/producto.interface';

@Component({
  selector: 'app-galeriaportipos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './galeriaportipos.component.html',
  styleUrls: ['./galeriaportipos.component.css'] // 👈 OJO: styleUrls (plural)
})
export class GaleriaportiposComponent implements OnInit {

  tipo: string = '';
  productos: Producto[] = [];

  // 🔹 Paginación
  pagina: number = 1;
  totalPaginas: number = 1;
  limite: number = 12;

  // 🔹 Estado
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: CatalogoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tipo = params.get('tipo') || '';
      this.pagina = 1;        // reset página cuando cambia tipo
      this.cargarProductos();
    });
  }

  cargarProductos() {
    if (!this.tipo) return;

    this.loading = true;
    this.error = null;

    this.productsService.getProductosPorTipo(this.tipo, this.pagina, this.limite)
      .subscribe({
        next: (res) => {
          // res: ProductosPaginados
          this.productos = res.data || [];
          this.totalPaginas = res.totalPaginas || 1;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar productos:', err);
          this.error = 'No se pudieron cargar los productos. Intenta de nuevo.';
          this.loading = false;
        }
      });
  }

  // URL de imagen segura
  getImagenUrl(producto: Producto): string {
    if ((producto as any).imagenUrl) {
      return (producto as any).imagenUrl!;
    }
    // Si no vino imagenUrl, la construimos desde "imagen"
    return `http://localhost:3000/uploads/${producto.imagen}`;
  }

  // 🔹 Navegación de página
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
}

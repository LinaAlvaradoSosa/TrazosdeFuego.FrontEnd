import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto, ProductosPaginados } from '../core/Interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  apiURL = 'https://trazosdefuego-backend.onrender.com/api';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders | undefined {
    if (typeof window === 'undefined') return undefined;

    const token = localStorage.getItem('token');
    if (!token) return undefined;

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getProducts(pagina: number = 1, limite: number = 12): Observable<ProductosPaginados> {
    const params = new HttpParams()
      .set('pagina', pagina)
      .set('limite', limite);

    return this.http.get<ProductosPaginados>(`${this.apiURL}/productos`, { params });
  }

  crearProducto(formData: FormData) {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiURL}/productos/crear`, formData, { headers });
  }

  deleteProduct(id: string) {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiURL}/productos/borrarProducto/${id}`, { headers });
  }

  getOneProduct(id: string) {
    return this.http.get(`${this.apiURL}/productos/obtenerProducto/${id}`);
  }

  getProductosPorTipo(
    tipo: string,
    pagina: number = 1,
    limite: number = 12
  ): Observable<ProductosPaginados> {
    const params = new HttpParams()
      .set('pagina', pagina)
      .set('limite', limite);

    return this.http.get<ProductosPaginados>(
      `${this.apiURL}/productos/obtenerProductosPorTipo/${tipo}`,
      { params }
    );
  }
  buscarProductosPorNombre(nombre: string): Observable<Producto[]> {
    const params = new HttpParams().set('nombre', nombre);
    return this.http.get<Producto[]>(`${this.apiURL}/productos/obteneProductoNombre`, { params });
  }
  
}

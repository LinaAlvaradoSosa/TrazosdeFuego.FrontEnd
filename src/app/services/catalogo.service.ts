import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../core/Interfaces/riducto.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  apiURL = "http://localhost:3000/api"

  constructor(private http : HttpClient) { }

  getProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiURL}/productos`)
  }
  deleteProduct(id: string){
    return this.http.delete(`${this.apiURL}/productos/borrarProducto/${id}`)
  }
  getOneProduct(id: string){
    return this.http.get(`${this.apiURL}/productos/obtenerProducto/${id}`)
  }

  crearProducto(formData: FormData) {
    return this.http.post(`${this.apiURL}/productos/crear`, formData);
  }
  getProductosPorTipo(tipo: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/productos/obtenerProductosPorTipo/${tipo}`);
  }
}

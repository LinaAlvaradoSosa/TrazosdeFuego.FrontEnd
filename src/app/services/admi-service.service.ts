import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdmiServiceService {
  
  apiURL: string ="https://trazosdefuego-backend.onrender.com/api";

  constructor(private http: HttpClient) { }

  // helper para headers con token
  private getAuthHeaders(): HttpHeaders {
    const token = this.obtenerToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  login(body: any) {
    return this.http.post(`${this.apiURL}/login`, body);
  }

  guardarToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }
  
  obtenerToken(): string | null {
    return typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null;
  }
  
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  // público, sin token
  sendMessage(body: any) {
    return this.http.post(`${this.apiURL}/nuevoMensaje`, body);
  }

  // protegido, con token
  getMessages(pagina: number, limite: number) {
    const headers = this.getAuthHeaders();
  
    return this.http.get(
      `${this.apiURL}/mostrarMensajes?pagina=${pagina}&limite=${limite}`,
      { headers }
    );
  }  

  // protegido, con token
  deleteMessage(id: string) {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiURL}/borrarMensaje/${id}`, { headers });
  }
}


import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdmiServiceService } from '../services/admi-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private adminService: AdmiServiceService, private router: Router) {}

  canActivate(): boolean {
    const token = this.adminService.obtenerToken();

    if (token) {
      return true; // permitido
    } else {
      this.router.navigate(['/admi-trazosdeFuego']); // vuelve al login
      return false;
    }
  }
}

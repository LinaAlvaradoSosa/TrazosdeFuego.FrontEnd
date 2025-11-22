import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdmiServiceService } from '../../services/admi-service.service';

@Component({
  selector: 'app-principal-admi',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './principal-admi.component.html',
  styleUrl: './principal-admi.component.css'
})
export class PrincipalAdmiComponent {

  // ⬅️ Inyectamos Router y el servicio admin
  constructor(
    private router: Router,
    private adminService: AdmiServiceService
  ) {}

  logout() {
    // limpiamos token usando el servicio
    this.adminService.logout();

    // redirigimos al login
    this.router.navigate(['/admi-trazosdeFuego']);
  }
}


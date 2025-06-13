import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AdmiServiceService } from '../../services/admi-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admi',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admi.component.html',
  styleUrl: './admi.component.css'
})
export class AdmiComponent {
  adminService = inject(AdmiServiceService)
  Formlogin! : FormGroup

  constructor (private fb: FormBuilder, private router: Router ){
  this.Formlogin = this.fb.group({
  correo: ['', [Validators.required]],
  contrasena: ['', [Validators.required]]
    })  
  }
  ngOnInit() {
    if (this.adminService.obtenerToken()) {
      this.router.navigate(['principalAdmi']);
    }
  }

  login(){
    if (this.Formlogin.valid) {
        this.adminService.login(this.Formlogin.value).subscribe({
            next:(resApi: any)=>{
              if(resApi && resApi.token) {
                this.adminService.guardarToken(resApi.token);
                this.router.navigate(['principalAdmi'])
              }
                Swal.fire({
                    icon:'success',
                    title:'Bienvenido a la cuenta administrativa de Trazos de Fuego',
                    text: ''
                });
            },
            error:(error:any) => {
                console.log(error)
                Swal.fire({
                    icon:'error',
                    title:'Ups! algo esta mal',
                    text: 'Revisa su datos para iniciar sesion'
              })
            }
        })
            } else {
          Swal.fire({
              icon:'warning',
              title:'Formulario Incorrecto',
              text:'por favor diligencie correctamente el formulario'
          })
      }
    }
}

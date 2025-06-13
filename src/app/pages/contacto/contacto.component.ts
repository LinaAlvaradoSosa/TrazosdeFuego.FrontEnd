import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdmiServiceService } from '../../services/admi-service.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  formularioContacto!: FormGroup

  constructor (private AdmiService: AdmiServiceService, private http: HttpClient, private fb: FormBuilder) {
    this.formularioContacto = this.fb.group({
      nombre: ["", [Validators.required]],
      correo: ["", [Validators.required]],
      celular: ["", []], 
      mensaje: ["", [Validators.required]],
      tipo: ["", []]
    })
  }

  sendMessage() {
    this.AdmiService.sendMessage(this.formularioContacto.value).subscribe({
      next: (resApi: any)=>{
        Swal.fire({
          icon:"success",
          title: "Mensaje enviado exitosamente",
          text: "Gracias por escribir a Trazos de Fuego, me comunicaré contigo muy pronto"
        })
        this.formularioContacto.reset();
      },
      error: (error:any) => {
        console.log(error);
        Swal.fire ({
          icon:"error",
          title: "Mensaje no enviado",
          text: "Por favor revisa que todos los campos del formulario estén diligenciados"
        })
      }
    })
  }

}

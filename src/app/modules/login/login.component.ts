import { Usuario } from './../../interface/usuario';
import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  correo: string = '';
  password: string = '';
  constructor(private auth: AuthserviceService, private router: Router){}

 // En tu componente de login
login() {
  const credenciales = {
    correoElec: this.correo,
    contraseña: this.password
  };

  this.auth.login(credenciales).subscribe({
    next: (response) => {
      console.log('Login exitoso:', response);

      if (response.usuario && response.token) {
        // ✅ Guardar token
        localStorage.setItem('token', response.token);

        // ✅ Guardar datos del usuario
        localStorage.setItem('usuario', JSON.stringify(response.usuario));
        localStorage.setItem('UsuarioId', response.usuario._id);
        localStorage.setItem('usuarioRol', response.usuario.rol);
        localStorage.setItem('usuarioNombre', response.usuario.nombre);
      }

      alert('Login exitoso');
      this.router.navigate(['/principal']);
    },
    error: (err) => {
      console.error('Error en login:', err);
      alert(err?.error?.mensaje || 'Credenciales inválidas');
    }
  });
}


}

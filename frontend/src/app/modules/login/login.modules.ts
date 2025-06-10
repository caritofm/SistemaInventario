import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { AuthserviceService } from '../../services/authservice.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, MatCardModule, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  correo: string = '';
  password: string = '';
    constructor(private auth: AuthserviceService, private router: Router){}
    login() {
  const credenciales = {
    correoElec: this.correo,
    contraseña: this.password
  };

  this.auth.login(credenciales).subscribe({
    next: (response) => {
      console.log('Login exitoso:', response);
      
      if (response.usuario) {
        // Solo guardar el nombre del usuario
        localStorage.setItem('usuario', JSON.stringify(response.usuario));
        localStorage.setItem('UsuarioId', response.usuario._id);
        localStorage.setItem('usuarioRol', response.usuario.rol);

        localStorage.setItem('usuarioNombre', response.usuario.nombre);
      }
      
      alert('Login exitoso');
      // Redirigir a donde necesites
      this.router.navigate(['/principal']);
    },
    error: (err) => {
      console.error('Error en login:', err);
      alert('Credenciales inválidas');
    }
  });
}
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
 
  constructor(private http: HttpClient) { }

  getRol():string | null{
    return localStorage.getItem('rol');
  }

  login(data: { correoElec: string; contraseña: string }) {
  return this.http.post<any>('http://localhost:3000/api/auth/login', data)
    .pipe(
      tap(response => {
        // Guarda datos en localStorage
        localStorage.setItem('usuario', JSON.stringify(response.usuario));
        localStorage.setItem('rol', response.usuario.rol);  // <--- Aquí guardas el rol
      })
    );
}


getUsuarioAutenticado() {
  const usuarioStr = localStorage.getItem('usuario');
  return usuarioStr ? JSON.parse(usuarioStr) : null;
}



}

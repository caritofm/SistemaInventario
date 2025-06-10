import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'
import { Proveedores } from '../../interface/proveedores';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicesBDService } from '../../services/services-bd.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, MatIcon,MatButtonModule, MatCardModule, FormsModule, CommonModule],
  templateUrl: './provedores.component.html',
  styleUrls: ['./provedores.component.css']
})
export class PrincipalComponent {
  proveedor: Proveedores = {
    nombre: '',
    rut:'',
    direccion: '',
    contacto: 
      {
        nombre: '',
        email: '',
        telefono: ''
      },
      terminosPago:'Contado'
    
  };

  terminos: string[] = ['Contado', 'Debito', '30 dias credito']

  constructor(private db: ServicesBDService, private http: HttpClient){}

  guardarProveedorr() {
  console.log('Datos proveedor a enviar:', this.proveedor);
  this.http.post('http://localhost:3000/api/proveedores', this.proveedor)
    .subscribe(
      res => console.log('Proveedor creado:', res),
      err => console.error('Error al crear proveedor:', err)
    );
}


  guardarProveedor() {
  const contacto = this.proveedor.contacto;

  if (
    this.proveedor.nombre.trim() === '' ||
    this.proveedor.rut.trim() === '' ||
    this.proveedor.direccion.trim() === '' ||
    contacto.nombre.trim() === '' ||
    contacto.email.trim() === '' ||
    contacto.telefono.trim() === ''
  ) {
    alert('Por favor completa todos los campos del proveedor.');
    return;
  }

  const formData = new FormData();
  formData.append('nombre', this.proveedor.nombre);
  formData.append('rut', this.proveedor.rut);
  formData.append('direccion', this.proveedor.direccion);
  formData.append('contacto', JSON.stringify(this.proveedor.contacto));

  this.db.addProveedores(formData).subscribe({
    next: (res) => {
      alert('Proveedor guardado correctamente');
      // limpiar el formulario si quieres
    },
    error: (err) => {
      console.error('Error al guardar proveedor:', err);
      alert('Error al guardar proveedor');
    }
  });
}

}
   
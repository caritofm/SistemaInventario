import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Proveedores } from '../../interface/proveedores';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicesBDService } from '../../services/services-bd.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-provedores',
  standalone: true,
  imports: [MatButtonModule, FormsModule, CommonModule],
  templateUrl: './provedores.component.html',
  styleUrl: './provedores.component.css'
})
export class ProvedoresComponent {
  constructor(private db:ServicesBDService, private http: HttpClient){}
  proveedor: Proveedores = {
    nombre: '',
    rut: '',
    direccion: '',
    contacto: 
      {
        nombre: '',
        email: '',
        telefono: ''
      },
      terminosPago: 'Contado'
    
  };
  provedor : any [] = []

  terminos: string[] = ['Contado', 'Debito', '30 dias credito']

 



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
  formData.append('contactoNombre', this.proveedor.contacto.nombre);
  formData.append('contactoEmail', this.proveedor.contacto.email);
  formData.append('contactoTelefono', this.proveedor.contacto.telefono);
  formData.append('terminosPago', this.proveedor.terminosPago); // no olvides este campo si lo usas



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



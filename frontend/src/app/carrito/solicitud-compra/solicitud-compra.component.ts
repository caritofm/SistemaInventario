import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-solicitud-compra',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule,MatCardModule,MatFormFieldModule
    ,MatInputModule,MatSelectModule, MatDatepickerModule,
    MatNativeDateModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './solicitud-compra.component.html',
  styleUrl: './solicitud-compra.component.css'
})
export class SolicitudCompraComponent {
   solicitud = {
    solicitante: '',
    fecha: new Date(),
    prioridad: 'media',
    comentarios: '',
    materiales: [
      { materialId: null, cantidad: 1 }
    ]
  };

  materialesDisponibles = [
    { id: 1, nombre: 'Plancha acero 1/4"' },
    { id: 2, nombre: 'Lubricante industrial' },
    { id: 3, nombre: 'Pernos 1/2"' }
  ];

  agregarMaterial() {
    this.solicitud.materiales.push({ materialId: null, cantidad: 1 });
  }

  eliminarMaterial(index: number) {
    this.solicitud.materiales.splice(index, 1);
  }

  enviarSolicitud() {
    console.log('Solicitud enviada:', this.solicitud);
    // Aquí iría la lógica para guardar o enviar al backend
  }

}

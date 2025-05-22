import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-produccion-embalaje',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './produccion-embalaje.component.html',
  styleUrl: './produccion-embalaje.component.css'
})
export class ProduccionEmbalajeComponent {

  embalajes = [
    {
      producto : 'Caja de motores',
      cantidad:100,
      fechaProgramada: new Date('2025-05-22'),
      estado:'Pendiente'
    },
    {
      producto : 'Caja de motores',
      cantidad:100,
      fechaProgramada: new Date('2025-05-22'),
      estado:'Proceso'
    },
    {
      producto : 'Caja de motores',
      cantidad:100,
      fechaProgramada: new Date('2025-05-22'),
      estado:'Finalizado'
    },
  ]

}

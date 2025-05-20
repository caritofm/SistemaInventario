import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-historial-compra',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatButtonModule, RouterModule,
    MatIconModule
  ],
  templateUrl: './historial-compra.component.html',
  styleUrl: './historial-compra.component.css'
})
export class HistorialCompraComponent {
  isPlayedColumns:string[] =['Fecha', 'Proveedor', 'Total', 'Verdetalles'];

  compra = [
    {
      Fecha:'24-04-2025', Proveedor: 'Acero copiapo', Total: '$300.000'
    },
    {
      Fecha:'20-04-2025', Proveedor: 'Acero copiapo', Total: '$400.000'
    }
  ]
}

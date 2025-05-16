import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-venc-lotes',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatIconModule, MatButtonModule, CommonModule, MatTooltipModule],
  templateUrl: './venc-lotes.component.html',
  styleUrl: './venc-lotes.component.css'
})
export class VencLotesComponent {
  isplayedColumns: string[] = ['codigo', 'descripcion', 'fechaCreacion', 'fechaVencimiento', 'estado', 'acciones'];

  lotes = [
    { codigo: 'LOTE-2024-001', descripcion: 'Engranajes 100mm', fechaCreacion: new Date('2024-05-05'), fechaVencimiento: new Date('2024-07-05') },
    { codigo: 'LOTE-2024-002', descripcion: 'Placas ASTM A36', fechaCreacion: new Date('2024-04-01'), fechaVencimiento: new Date('2024-06-30') },
    { codigo: 'LOTE-2024-003', descripcion: 'Ejes hidráulicos', fechaCreacion: new Date('2024-03-10'), fechaVencimiento: new Date('2024-05-15') },
  ];

  getEstadoTexto(lote: any) {
    const hoy = new Date();
    if (hoy > lote.fechaVencimiento) return 'VENCIDO';
    const diasAlerta = 15;
    const fechaAlerta = new Date();
    fechaAlerta.setDate(hoy.getDate() + diasAlerta);
    if (lote.fechaVencimiento <= fechaAlerta) return 'PRÓXIMO A VENCER';
    return 'ACTIVO';
  }

  getEstadoClass(lote: any) {
    const hoy = new Date();
    if (hoy > lote.fechaVencimiento) return 'estado-vencido';
    const diasAlerta = 15;
    const fechaAlerta = new Date();
    fechaAlerta.setDate(hoy.getDate() + diasAlerta);
    if (lote.fechaVencimiento <= fechaAlerta) return 'estado-proximo';
    return 'estado-activo';
  }

}

import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [MatTableModule, MatIcon,MatIconModule, MatButtonModule, MatTooltipModule, CommonModule],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent {
  isplayedColumns: string[] = ['codigo', 'descripcion', 'stock', 'ubicacion', 'acciones'];

  productos = [
    {
      codigo: 'A23490', descripcion: 'Fierros', stock:'200', ubicacion:'Bodega A Fila 200'
    },
     {
      codigo: 'A23490', descripcion: 'Fierros', stock:'200', ubicacion:'Bodega A Fila 200'
    },
     {
      codigo: 'A23490', descripcion: 'Fierros', stock:'200', ubicacion:'Bodega A Fila 200'
    },
  ]

}

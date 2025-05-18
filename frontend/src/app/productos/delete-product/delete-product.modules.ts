import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { matTooltipAnimations, MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogComponent } from './delete-product.component';


@Component({
  selector: 'app-venc-lotes',
  standalone: true,
  imports: [MatTableModule,DialogComponent, MatIcon, MatIconModule, MatButtonModule,MatTooltipModule, CommonModule, MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle, MatDialogModule],
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
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

  readonly dialog = inject(MatDialog);
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
}
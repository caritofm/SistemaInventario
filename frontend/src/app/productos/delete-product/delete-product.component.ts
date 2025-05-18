import { Component, inject,ChangeDetectionStrategy} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [MatTableModule,RouterModule, MatIcon,MatIconModule, MatButtonModule, MatTooltipModule, CommonModule],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent {
  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  
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


@Component({
  selector: 'dialog',
  standalone:true,
  templateUrl: './dialog.component.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
}




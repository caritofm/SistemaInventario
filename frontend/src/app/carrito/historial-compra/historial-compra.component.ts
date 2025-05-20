import { Producto } from './../../productos/alert-stock/alert-stock.component';
import { Component, inject, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
@Component({
  selector: 'app-historial-compra',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatButtonModule, RouterModule,
    MatIconModule, MatDialogClose,
      MatDialogContent,
      MatDialogTitle,MatDialogActions
  ],
  templateUrl: './historial-compra.component.html',
  styleUrl: './historial-compra.component.css'
})
export class HistorialCompraComponent {

    readonly dialog = inject(MatDialog);
  
    openDialog(compraSelecionada:any): void {
      this.dialog.open(DialogComponent, {
        width: '250px',
        data:compraSelecionada,
        enterAnimationDuration:'0ms',
        exitAnimationDuration:'0ms',
        panelClass:'dialog-background'
      });
    }
  isPlayedColumns:string[] =['Fecha', 'Proveedor', 'Total', 'Verdetalles'];

  compra = [
    {
      Fecha: '24-04-2025',
      Proveedor: 'Acero Copiapó',
      Total: '$300.000',
      productos: [
        { nombre: 'Acero', cantidad: '10', precioUnitario: '$10.990' },
        { nombre: 'Pernos', cantidad: '100', precioUnitario: '$100' }
      ]
    },
    {
      Fecha: '20-04-2025',
      Proveedor: 'Hierros Norte',
      Total: '$400.000',
      productos: [
        { nombre: 'Tubo cuadrado', cantidad: '5', precioUnitario: '$20.000' },
        { nombre: 'Ángulo 3x3', cantidad: '20', precioUnitario: '$2.500' }
      ]
    }
  ];
}

@Component({
  selector: 'dialog',
  standalone:true,
  templateUrl: './dialog.component.html',
  styleUrls:['./dialog.component.css'],
  imports: [MatButtonModule, MatDialogActions,MatTableModule, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // 👈 Aquí es clave
  ) {}

  // Puedes logear para ver si llegan los datos
  ngOnInit() {
    console.log('Datos recibidos:', this.data);
  }
  productos = [
    {id:'1', nombre:'Acero', cantidad: '10', precioUnitario: '$10.990'},
    {id:'2', nombre:'Pernos', cantidad: '100', precioUnitario: '$100'},
  ];

   compra = [
    {
      Fecha: '24-04-2025',
      Proveedor: 'Acero Copiapó',
      Total: '$300.000',
      productos: [
        { nombre: 'Acero', cantidad: '10', precioUnitario: '$10.990' },
        { nombre: 'Pernos', cantidad: '100', precioUnitario: '$100' }
      ]
    },
    {
      Fecha: '20-04-2025',
      Proveedor: 'Hierros Norte',
      Total: '$400.000',
      productos: [
        { nombre: 'Tubo cuadrado', cantidad: '5', precioUnitario: '$20.000' },
        { nombre: 'Ángulo 3x3', cantidad: '20', precioUnitario: '$2.500' }
      ]
    }
  ];

 

}

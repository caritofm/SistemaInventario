
import { Component, inject,ChangeDetectionStrategy, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Inject } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { ServicesBDService } from '../../services/services-bd.service';
import { Producto } from '../../interface/producto';
@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [MatTableModule,RouterModule, MatIcon,MatIconModule, MatButtonModule, MatTooltipModule, CommonModule],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

      productos: Producto[] = []
    
      constructor(private servicebd: ServicesBDService){}

    ngOnInit(): void {
    this.servicebd.getProductos().subscribe((data) =>{
      console.log('Productos desde backend', data)
      this.productos = data;
    })
    
  }
  
  isplayedColumns: string[] = ['codigo', 'descripcion', 'categoria', 'stock', 'ubicacion','imagen', 'acciones'];


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
  productos: Producto[] = []

  constructor(private servicebd: ServicesBDService, @Inject(MAT_DIALOG_DATA) public data :{id :string}){}
  
  objeto = {id:null}

  eliminarProducto(id: string) {
  this.servicebd.deleteProducto(id).subscribe({
    next: () => {
      this.productos = this.productos.filter(p => p_id !== id); // ✅ operador corregido
    },
    error: err => {
      console.error('Error al eliminar producto', err);
      alert('No se pudo eliminar este');
    }
  });
}

}




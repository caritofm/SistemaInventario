import { Component, inject, OnInit } from '@angular/core';
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

import { ServicesBDService } from '../../services/services-bd.service';
import { Producto } from '../../interface/producto';


@Component({
  selector: 'app-venc-lotes',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatIconModule, MatButtonModule,MatTooltipModule, CommonModule, MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle, MatDialogModule],
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  productos: Producto[] = []

  constructor(private servicebd: ServicesBDService){}

  ngOnInit(): void {
    this.servicebd.getProductos().subscribe((data) =>{
      this.productos = data;
    })
    
  }

  
  eliminarProducto(id: string) {
  this.servicebd.deleteProducto(id).subscribe({
    next: () => {
      this.productos = this.productos.filter(p => p._id !== id); // ✅ operador corregido
    },
    error: err => {
      console.error('Error al eliminar producto', err);
      alert('No se pudo eliminar este');
    }
  });
}


     isplayedColumns: string[] = ['codigo', 'descripcion','categoria', 'stock', 'ubicacion','Imagen', 'acciones'];


  readonly dialog = inject(MatDialog);
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
}
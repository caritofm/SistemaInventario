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
import { Categoria } from '../../interface/categoria';
import { RouterModule } from '@angular/router';
import { Alerta } from '../../interface/alerta';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-venc-lotes',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatIconModule, MatButtonModule,MatTooltipModule, CommonModule, MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle, MatDialogModule, RouterModule, FormsModule],
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  productos: Producto[] = []
  productoId: string = '';
  categorias: Categoria[] = []
  alertas : Alerta[] = []
  productosFiltrado : Producto[] = []
    

  constructor(private servicebd: ServicesBDService){}

  

      ngOnInit(): void {
        this.cargarProductos();
        this.cargarCategorias();
      
    }

     categoriaSeleccionada : string = '';
   textoCategoria: string = '';
   filtrarPorCategoria() {
  const texto = this.textoCategoria.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (!texto) {
    // Si el campo está vacío, mostrar todos los productos
    this.productosFiltrado = [...this.productos]; // Copia completa
    return;
  }

  this.productosFiltrado = this.productos.filter(p => {
    if (typeof p.categoria === 'object' && p.categoria !== null && 'nombreCategoria' in p.categoria) {
      const nombreCat = p.categoria.nombreCategoria
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      return nombreCat.includes(texto);
    }
    return false;
  });

  if (this.productosFiltrado.length === 0) {
    alert('No se encontraron productos con esa categoría.');
  }
}

   
   


    cargarProductos(){
    this.servicebd.getProductosConAlertas().subscribe({
      next: res =>{
        this.productos = res.productos
        this.alertas = res.alertas
      },
      error: () =>{
        alert('Error al obtener productos')
      }
    })
   
  }
  
    cargarCategorias(){
      this.servicebd.getCategorias().subscribe({
        next:(data: Categoria[]) =>{
          this.categorias = data
        },
        error:(error) =>{
          console.error('Error al cargar categorias: ',error)
  
        }
      });
    }
  



     isplayedColumns: string[] = ['codigo', 'descripcion','categoria', 'stock', 'ubicacion','Imagen', 'acciones'];


  readonly dialog = inject(MatDialog);
  openDialog(producto: Producto, enterAnimationDuration: string, exitAnimationDuration: string): void {
  const dialogRef = this.dialog.open(DialogComponent, {
    width: '250px',
    enterAnimationDuration,
    exitAnimationDuration,
    data: producto
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      // Aquí llamas a eliminar el producto usando el servicio
      this.servicebd.deleteProducto(producto._id).subscribe(() => {
        // Recarga productos después de eliminar
        this.ngOnInit();
      });
    }
  });
}

  
}
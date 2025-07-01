import { Producto } from './../../interface/producto';

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
import { id } from '@swimlane/ngx-charts';
import { Categoria } from '../../interface/categoria';
import { Ubicacion } from '../../interface/ubicacion';
import { Alerta } from '../../interface/alerta';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [MatTableModule,RouterModule, MatIcon,MatIconModule, MatButtonModule, MatTooltipModule, FormsModule
  ],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent implements OnInit {
  readonly dialog = inject(MatDialog);



  

      productos: Producto[] = []
      productoId: string = '';
      categorias: Categoria[] = []
      ubicacion: Ubicacion[] = []
      alertas: Alerta[] = []
      productosFiltrado : Producto[] = []

     
 
    
      constructor(private servicebd: ServicesBDService){}

    ngOnInit(): void {
      this.cargarProductos();
      this.cargarCategorias();
      this.cargarUbicacion();
    
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
        console.log('Alertas', this.alertas)
        this.productosFiltrado = res.productos
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

  cargarUbicacion(){
    this.servicebd.getUbicacion().subscribe({
      next:(data: Ubicacion[]) =>{
        this.ubicacion = data
        console.log('ubicaciones', data)
      },
      error:(error) => {
        console.error('Error al cargar ubicaciones:', error)
      }
    })
  }

  



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

  
  isplayedColumns: string[] = ['codigo', 'descripcion', 'categoria', 'stock', 'ubicacion', 'acciones'];


}


@Component({
  selector: 'dialog',
  standalone:true,
  templateUrl: './dialog.component.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  productos: Producto[] = []
  ngOnInit(): void {
    
  }
  
  constructor(private servicebd: ServicesBDService,  @Inject(MAT_DIALOG_DATA) public data: any ){}

    eliminarProducto() {
    console.log('Data recibida en el diálogo:', this.data);
    if (!this.data || !this.data._id) {
      console.error('❌ Producto inválido o sin ID');
      return;
    }

    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close(false);
  }


}




import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
export interface Producto {
  nombre:string;
  stock:number;
}
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-alert-stock',
  standalone: true,
  imports: [ MatIconModule, MatCardModule, CommonModule],
  templateUrl: './alert-stock.component.html',
  styleUrl: './alert-stock.component.css'
})
export class AlertStockComponent {
  productos: Producto[] = [
    { nombre: 'Clavos', stock: 3 },
    { nombre: 'Martillos', stock: 20 },
    { nombre: 'Tornillos', stock: 1 }
  ];
   notifications = [
    'Se esta acabando el stock de tornillos',
    'El stock de Fierros esta en 0 ',
    'Se solicita actualizacion de stock'
  ]
  
  constructor(private snackBar: MatSnackBar) {}

   ngOnInit(): void {
    this.alertarProductosBajos();
  }

  alertarProductosBajos(): void {
    const productosAgotandose = this.productos.filter(p => p.stock <= 5);
    productosAgotandose.forEach(producto => {
      this.snackBar.open(`⚠️ El producto "${producto.nombre}" se está agotando (quedan ${producto.stock})`, 'Cerrar', {
        duration: 5000,
        panelClass: ['alerta-stock']
      });
    });
  }

}

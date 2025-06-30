import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ServicesBDService } from '../../services/services-bd.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButton],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {

  proveedores: any[] = [];
  productosDisponibles: any[] = [];
  nuevaCompra: any = {
    proveedorId: '',
    condicionesPago: '',
    productos: [],
    usuarioId: '',
    total: 0
  };

  usuarioNombre: string = ''
 

  productoSeleccionado = '';
  cantidad = 0;
  precioUnitario = 0;

  constructor(private db: ServicesBDService) {}

ngOnInit() {
  const usuarioGuardado = localStorage.getItem('usuario');
  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);
    this.usuarioId = usuario.id; // ✅ GUARDAR correctamente
    this.usuarioNombre = usuario.nombre;
    this.nuevaCompra.usuarioId = this.usuarioId; // ✅ Aquí se asigna correctamente
  } else {
    console.warn('⚠️ No se encontró usuario en localStorage');
  }

  this.db.getProveedores().subscribe(res => this.proveedores = res);
  this.db.getProductos().subscribe(res => this.productosDisponibles = res);
}



  usuarioId = '';

  agregarProducto() {
    if (this.productoSeleccionado && this.cantidad > 0 && this.precioUnitario > 0) {
      this.nuevaCompra.productos.push({
        productoId: this.productoSeleccionado,
        cantidad: this.cantidad,
        precioUnitario: this.precioUnitario
      });

      this.actualizarTotal();

      this.productoSeleccionado = '';
      this.cantidad = 0;
      this.precioUnitario = 0;
    }
  }

  actualizarTotal() {
    this.nuevaCompra.total = this.nuevaCompra.productos.reduce((total: number, p: any) => {
      return total + (p.cantidad * p.precioUnitario);
    }, 0);
  }

  registrarCompra() {
  console.log('🛒 Datos enviados al backend:', this.nuevaCompra);

  if (!this.nuevaCompra.usuarioId) {
    alert('⚠️ Debes estar logueado para registrar la compra.');
    return;
  }

  this.db.crearCompra(this.nuevaCompra).subscribe({
    next: () => {
      alert('✅ Compra registrada');
      this.nuevaCompra.productos = [];
      this.nuevaCompra.total = 0;
    },
    error: () => alert('❌ Error al registrar compra')
  });
}




}

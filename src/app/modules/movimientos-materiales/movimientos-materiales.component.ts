import { Component } from '@angular/core';
import { ServicesBDService } from '../../services/services-bd.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movimientos-materiales',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './movimientos-materiales.component.html',
  styleUrl: './movimientos-materiales.component.css'
})
export class MovimientosMaterialesComponent {
  nuevoMovimiento = {
    producto_id: '',
    tipo: '',
    cantidad: 0,
    motivo: '',
    usuario_id: '',
    fecha: new Date()
  };

  productos: any[] = [];
  productoId: string = ''; // 👈 opcional si usas [(ngModel)]

  usuario_id: string = '';
  usuarioNombre: string = '';

  constructor(
    private db: ServicesBDService,
    private authService: AuthserviceService,
    private router: Router
  ) {}

  ngOnInit() {
  const usuarioGuardado = localStorage.getItem('usuario');
  console.log('🔍 Usuario desde localStorage:', usuarioGuardado);
  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);
    this.usuario_id = usuario.id; // ✅ Aquí recuperas el ID real
    this.usuarioNombre = usuario.nombre;
  } else {
    console.warn('⚠️ Usuario no encontrado en localStorage');
  }

  this.nuevoMovimiento.usuario_id = this.usuario_id;
  console.log('Id', this.usuario_id)

  this.db.getProductos().subscribe(res => {
    this.productos = res;
    console.log('Productos:', this.productos);
  });
}


  registrarMovimiento() {
    this.nuevoMovimiento.usuario_id = this.usuario_id;
    this.nuevoMovimiento.fecha = new Date(); // por si el usuario no la elige

    console.log('Movimiento a enviar:', this.nuevoMovimiento);

    this.db.addMovimientos(this.nuevoMovimiento).subscribe({
      next: () => {
        alert('✅ Movimiento registrado');

        this.nuevoMovimiento = {
          producto_id: '',
          tipo: '',
          cantidad: 0,
          motivo: '',
          usuario_id: this.usuario_id,
          fecha: new Date()
        };
      },
      error: err => {
        console.error('❌ Error al registrar movimiento:', err);
        alert('❌ Error al registrar movimiento');
      }
    });
  }
}

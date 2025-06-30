import { Component } from '@angular/core';
import { ServicesBDService } from '../../services/services-bd.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-movimientos',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './ver-movimientos.component.html',
  styleUrl: './ver-movimientos.component.css'
})
export class VerMovimientosComponent {
  movimientos: any[] = [];

  constructor(private db: ServicesBDService) {}
  usuarioId:string = '';
  usuarioNombre: string = '';

   nuevoMovimiento = {
    producto_id: '',
    tipo: '',
    cantidad: 0,
    motivo: '',
    usuario_id: '',
    fecha: new Date()
  };

  ngOnInit() {

   


    this.db.getMovimientos().subscribe({
      next: res => {
        this.movimientos = res;
        console.log('Movimientos:', res);
      },
      error: err => console.error('Error cargando movimientos:', err)
    });
  }

  obtenerNombreUsuario(movimiento: any): string {
    if (movimiento.usuarioNombre) {
      return movimiento.usuarioNombre;
    }
    
    if (movimiento.usuario_id && typeof movimiento.usuario_id === 'object') {
      return movimiento.usuario_id.nombre || 'Usuario desconocido';
    }
    
    if (movimiento.usuario_id) {
      return `Usuario ID: ${movimiento.usuario_id}`;
    }
    
    return 'Sin usuario';
  }

}

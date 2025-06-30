import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Alerta } from '../../interface/alerta';
import { ServicesBDService } from '../../services/services-bd.service';
import { MatIconModule } from '@angular/material/icon';
import { BitacoraComponent } from '../bitacora/bitacora.component';


@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [CommonModule, MatIconModule, NgClass, BitacoraComponent],
  templateUrl: './notificacion.component.html',
  styleUrl: './notificacion.component.css'
})
export class NotificacionComponent implements OnInit {
  alertas: Alerta[] = [];
  mensajes:Alerta [] = [];
  bitacoraReciente : any[] =[]
 private yaCargado = false; 
 rolUsuario: string = '';

  constructor(private db: ServicesBDService) {}

ngOnInit(): void {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const usuario_id = usuario._id;
  const rol = usuario?.rol;
  this.rolUsuario = rol;

  if (this.yaCargado) return;
  this.yaCargado = true;
  if (rol === 'admin' || rol=== 'gestor') {
    this.db.getProductosConAlertas().subscribe({
      next: res => {
        this.alertas = res.alertas; // NO concatenar si ya se van a mostrar aparte
        console.log('Alertas del sistema:', this.alertas);
      }
    });
  }else{
    console.log('No hay alertas para este usuario')
  }
   if (usuario_id) {
    this.db.getNotificacionesPorUsuario(usuario_id).subscribe({
      next: notificaciones => {
        this.mensajes = notificaciones.map(n => ({
          tipo: n.tipo,
          mensaje: n.mensaje
        }));
        console.log('Notificaciones personales:', this.mensajes);
      }
    });
  }

   this.db.getUltimaBitacora().subscribe({
    next: (data) => {
      // Convertir las fechas a objetos Date
      this.bitacoraReciente = data.map(b => ({
        ...b,
        fecha: new Date(b.fecha)
      }));
      console.log('datos:', this.bitacoraReciente)
    },
    error: (err) => console.error('Error al cargar bitácora:', err)
  });




}


  
}






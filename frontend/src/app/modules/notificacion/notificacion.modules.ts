
import { Component, OnInit } from '@angular/core';
import { ServicesBDService } from '../../services/services-bd.service';
import { Alerta } from '../../interface/alerta';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIcon, NgClass],
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {
    mostrarAlerta: boolean = false;
  alertas: Alerta[] = [];
  mensajes : Alerta[] = [];
  private yaCargado = false;


  constructor(private db: ServicesBDService) {}

ngOnInit(): void {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const usuario_id = usuario?._id;
  const rol = usuario?.rol;

  if (this.yaCargado) return;
  this.yaCargado = true;
  if (rol === 'admin') {
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

}




 getIconoAlerta(tipo: string): string {
    const t = tipo.toLowerCase();
    if (t.includes('stock')) return 'warning';
    if (t === 'aprovada') return 'check_circle';
    if (t === 'rechazada') return 'cancel';
    return 'notifications';
  }

  getClaseAlerta(tipo: string): string {
    const t = tipo.toLowerCase();
    if (t.includes('stock')) return 'stock-bajo';
    if (t === 'Aprobada') return 'aprobada';
    if (t === 'Rechazada') return 'rechazada';
    return 'generica';
  }

    
   

}
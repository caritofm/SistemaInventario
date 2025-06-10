import { Component, OnInit } from '@angular/core';
import { ServicesBDService } from '../../services/services-bd.service';
import { Solicitud } from '../../interface/solicitud';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../interface/usuario';
import { Producto } from '../../interface/producto';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { id } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-ver-solicitud',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule, MatTableModule, MatTableModule],
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css']
})

export class VerSolicitudComponent implements OnInit {

  constructor(private db: ServicesBDService){}
  dataSolicitudes: Solicitud[] =[]

  usuarioNombre: string = '';

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const usuarioId = usuario._id || null;
    this.usuarioNombre = usuario.nombre || null;
    console.log('Usuarios', usuarioId)
    this.db.getSolicitudes().subscribe({
      next: res=> {
        this.dataSolicitudes = res
        console.log('Solicitudes', this.dataSolicitudes)
      }, 
      error: () =>{
        console.log('Error al obtener solicitudes')

      }

    })

    
   

  }

  isProducto(obj: any): obj is Producto {
  return obj && typeof obj === 'object' && 'codigo' in obj;
}

isUsuario(obj: any): obj is Usuario {
  return obj && typeof obj === 'object' && 'nombre' in obj;
}
aceptarSolicitud(id: string) {
  this.db.aprobarSolicitud(id).subscribe({
    next: () => console.log('Solicitud aprobada'),
    error: err => console.error('Error aprobando solicitud', err)
  });
}



rechazarSolicitud(id: string) {
  this.db.rechazarSolicitud(id).subscribe({
    next: () => {
      this.dataSolicitudes = this.dataSolicitudes.filter(sol => sol._id !== id); // ⬅ Elimina del array
      console.log('Solicitud rechazada');
    },
    error: () => {
      console.error('Error al rechazar solicitud');
    }
  });
}





}

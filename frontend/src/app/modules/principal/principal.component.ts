import { Component, OnInit } from '@angular/core';
import{ NgxChartsModule} from '@swimlane/ngx-charts'
import {MatCardModule} from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NotificacionComponent } from "../notificacion/notificacion.component";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ServicesBDService } from '../../services/services-bd.service';
@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [NgxChartsModule, MatIcon, MatCardModule, RouterModule, NotificacionComponent, 
    MatIconModule, CommonModule, MatButtonModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {
  usuarioNombre  = localStorage.getItem('usuarioNombre') || 'usuario';
  usuarioRol = localStorage.getItem('usuarioRol') || 'usuario';
  totalProductos :number = 0;
  stockTotal: number = 0;
  constructor(private db: ServicesBDService){}

  ngOnInit(): void {
    console.log('usuario rol', this.usuarioRol);
    console.log('Usuario nombre', this.usuarioNombre);
    this.db.getTotalProductos().subscribe(res => {
      this.totalProductos = res.total
    })

    //stock total de los productos 

    this.db.getStockTotal().subscribe({
    next: (res) => {
      this.stockTotal = res.totalStock;
    },
    error: (err) => {
      console.error('Error al obtener stock total', err);
    }
  });
  this.getMovimientoEntrada()
  this.getMovimientoSalida()
  this.getSolicitudesPendientes()
  }

  totalSalida:number = 0;
  getMovimientoSalida(){
    this.db.getTotalSalida().subscribe({
      next:(res) => {
        this.totalSalida = res.salidaTotal;
        console.log('Salidas', this.totalSalida)
      },
      error:(err) =>{
        console.log('Error al obtener salidas totales ', err)
      }
    })
  }

    entradaTotal: number = 0;
   getMovimientoEntrada(){
    this.db.getTotalEntrada().subscribe({
      next:(res) => {
        this.entradaTotal = res.totalEntrada;
        console.log('Entrada', this.totalSalida)
      },
      error:(err) =>{
        console.log('Error al obtener salidas totales ', err)
      }
    })
  }

  totalPendientes: number = 0;
  getSolicitudesPendientes(){
     this.db.getTotalSolicitudes().subscribe(res => {
    this.totalPendientes = res.totalSolicitudes;
  });

  }


 
  
}

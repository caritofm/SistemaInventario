import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'
import { NotificacionComponent } from '../notificacion/notificacion.component';
import { CommonModule } from '@angular/common';
import { ServicesBDService } from '../../services/services-bd.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, MatIcon,MatButtonModule, MatCardModule, NotificacionComponent, MatIconModule,
    CommonModule
  ],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  usuarioNombre  = localStorage.getItem('usuarioNombre') || 'Usuario';
  usuarioRol = localStorage.getItem('UsuarioRol') || 'usuario';

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

        this.getMovimientoEntrada();
        this.getMovimientoSalida();
    
      
    }

      totalSalida:number = 0;
  getMovimientoSalida(){
    this.db.getTotalSalida().subscribe({
      next:(res) => {
        this.totalSalida = res.salidaTotal;
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
        this.totalSalida = res.totalEntrada;
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
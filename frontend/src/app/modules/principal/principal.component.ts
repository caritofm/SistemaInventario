import { Component } from '@angular/core';
import{ NgxChartsModule} from '@swimlane/ngx-charts'
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [NgxChartsModule,MatIcon, MatCardModule, RouterModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  cards = [
    {icon: 'inventory', label :'Productos', route:'/productos'},
    {icon : 'groups', label:'Colaboradores', route:'/colaboradores'},
    {icon:'inventory', label:' provedores', route:'/provedores'},
    {icon:'shopping_cart_checkout', label:'Carito de compras'},
    {icon:'notifications', label:'Solicitudes'},
    {icon:'description', label:'Informes'}

  ]

  notifications = [
    'Nuevo colaborador agregado',
    'Se actualizo perfil',
    'Se elimino colaborador',
    'Nueva actualizacion disponible'
  ]
  
}

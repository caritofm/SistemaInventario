import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-control-energia',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterModule, CommonModule],
  templateUrl: './control-energia.component.html',
  styleUrl: './control-energia.component.css'
})
export class ControlEnergiaComponent {
  consumoTotalKwh = 342.7;
  equipos = [
    {nombre: 'Torno CNC', consumo: 120.5, encendido:true},
    {nombre: 'Soldadora MIG', consumo: 89.2, encendido:false},
    {nombre: 'Compresor Industrial', consumo: 133.5, encendido:true},

  ];

  toggleEquipo(index:number){
    this.equipos[index].encendido = !this.equipos[index].encendido;
  }

  getColor(consumo:number):string{
    return consumo > 100 ? 'red' : 'green';
  }

}

import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


interface Cargo {
  id_cargo:number;
  nombreCargo:string
}

@Component({
  selector: 'app-colaboradores',
  standalone: true,
  imports: [MatCardModule, FormsModule, MatInputModule, MatSelectModule,MatFormFieldModule],
  templateUrl: './colaboradores.component.html',
  styleUrl: './colaboradores.component.css'
})
export class ColaboradoresComponent {

  cargos: Cargo[] =[
    {
      id_cargo: 1, nombreCargo:'Gestor de inventario'
    },
    {
      id_cargo:2, nombreCargo:'Comprador'
    },
    {
      id_cargo:3, nombreCargo:'Encargado de logistica'
    },
    {
      id_cargo:4, nombreCargo:'Jefe de produccion'
    },
    {
      id_cargo:5, nombreCargo:'Auditor'
    },
  ]

}

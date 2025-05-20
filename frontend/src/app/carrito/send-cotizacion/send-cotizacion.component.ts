import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
interface product{
  codigo: number;
  name: string;
}
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-send-cotizacion',
  standalone: true,
  imports: [MatCardModule, FormsModule, MatButtonModule,MatInputModule,MatFormFieldModule, MatSelectModule],
  templateUrl: './send-cotizacion.component.html',
  styleUrl: './send-cotizacion.component.css',
  encapsulation:ViewEncapsulation.None
})
export class SendCotizacionComponent {
  selectedValue: string ='';
  
  products :product[] = [
    {codigo: 1, name: 'producto 1'},
    {codigo: 2, name:'producto2'},
    {codigo:3 , name: 'producto 3'}
  ]

  proveedoresSeleccionados: number[] = [];
proveedoresDisponibles = [
  { id: 1, nombre: 'Proveedor Norte' },
  { id: 2, nombre: 'Suministros Atacama' },
  { id: 3, nombre: 'Logística Minera' },
];


}

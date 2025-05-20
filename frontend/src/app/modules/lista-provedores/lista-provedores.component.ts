import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-lista-provedores',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './lista-provedores.component.html',
  styleUrl: './lista-provedores.component.css'
})
export class ListaProvedoresComponent {
  displayedColumns: string[] = ['codigo', 'RazonSocial', 'rut', 'telefono', 'direccionLegal','nombreContacto', 'telefonoContacto'];


   dataProvedores = [
    {
      codigo: 'P1', RazonSocial: 'Empresa 1', rut:'9.457.789-6', telefono:'Bodega A Fila 200', direccionLegal:'lo prado #555', nombreContacto:'Juan perez',
      telefonoContacto:'9945678'
    },
     {
      codigo: 'P2', RazonSocial: 'Empresa 2', rut:'7.524.896-7', telefono:'Bodega A Fila 200', direccionLegal:'lo prado #555', nombreContacto:'Juan perez',
      telefonoContacto:'9945678'
    },
     {
      codigo: 'P3', RazonSocial: 'Empresa 3', rut:'8.256.147-3', telefono:'Bodega A Fila 200', direccionLegal:'lo prado #555', nombreContacto:'Juan perez',
      telefonoContacto:'9945678'
    },
     {
      codigo: 'P4', RazonSocial: 'Empresa 4', rut:'5.147.591-6', telefono:'Bodega A Fila 200', direccionLegal:'lo prado #555', nombreContacto:'Juan perez',
      telefonoContacto:'9945678'
    },
     
  ]

}

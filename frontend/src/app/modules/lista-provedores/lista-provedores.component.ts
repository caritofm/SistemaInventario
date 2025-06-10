import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServicesBDService } from '../../services/services-bd.service';
import { Proveedores } from '../../interface/proveedores';

@Component({
  selector: 'app-lista-provedores',
  standalone: true,
  imports: [MatTableModule, CommonModule, RouterModule],
  templateUrl: './lista-provedores.component.html',
  styleUrl: './lista-provedores.component.css'
})
export class ListaProvedoresComponent implements OnInit{

  constructor(private db:ServicesBDService){}
  displayedColumns: string[] = ['Nombre', 'Rut', 'direccion','nombreContacto','Email', 'telefonoContacto', 'terminosPago'];
  dataProovedores: Proveedores[] = []

ngOnInit(): void {
  this.db.getProveedores().subscribe({
    next: res=>{
      this.dataProovedores = res
      console.log('data', this.dataProovedores)

    },
    error: () =>{
      console.log('Error al obtener productos')
    }
  })
  
}




}

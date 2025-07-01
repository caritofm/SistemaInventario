import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { matTooltipAnimations, MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { Producto } from '../../interface/producto';
import { ServicesBDService } from '../../services/services-bd.service';


@Component({
  selector: 'app-venc-lotes',
  standalone: true,
  imports: [MatTableModule, MatIcon,  MatIconModule, MatButtonModule,MatTooltipModule, CommonModule],
  templateUrl: './venc-lotes.component.html',
  styleUrls: ['./venc-lotes.component.css']
})
export class VencLotesComponent implements OnInit {

  productosVec: Producto[] = [];

  // ✅ CORREGIR el nombre de la variable
  displayedColumns: string[] = ['codigo', 'descripcion', 'fechaCreacion', 'fechaVencimiento', 'estado'];

  constructor(private db: ServicesBDService) {}

  ngOnInit(): void {
    this.db.getFechaVencimiento().subscribe(data => {
  console.log(data); // ¿Los objetos tienen la propiedad fechaVencimiento?
});



  }

  getEstadoTexto(lote: any): string {
    const hoy = new Date();
    const vencimiento = new Date(lote.fechaVencimiento);
    if (hoy > vencimiento) return 'VENCIDO';

    const diasAlerta = 15;
    const fechaAlerta = new Date();
    fechaAlerta.setDate(hoy.getDate() + diasAlerta);

    if (vencimiento <= fechaAlerta) return 'PRÓXIMO A VENCER';
    return 'ACTIVO';
  }

  getEstadoClass(lote: any): string {
    const hoy = new Date();
    const vencimiento = new Date(lote.fechaVencimiento);

    if (hoy > vencimiento) return 'estado-vencido';
    const diasAlerta = 15;
    const fechaAlerta = new Date();
    fechaAlerta.setDate(hoy.getDate() + diasAlerta);

    if (vencimiento <= fechaAlerta) return 'estado-proximo';
    return 'estado-activo';
  }
}



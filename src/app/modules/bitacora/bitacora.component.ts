import { Component, OnInit } from '@angular/core';
import { ServicesBDService } from '../../services/services-bd.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bitacora',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.css'
})
export class BitacoraComponent implements OnInit {

   registros: any[] = [];

  constructor(private db: ServicesBDService) {}

  ngOnInit(): void {
  this.db.obtenerBitacora().subscribe({
    next: (data) => {
      // Convertir las fechas a objetos Date
      this.registros = data.map(r => ({
        ...r,
        fecha: new Date(r.fecha)
      }));
      console.log('datos:', this.registros)
    },
    error: (err) => console.error('Error al cargar bitácora:', err)
  });
}


}

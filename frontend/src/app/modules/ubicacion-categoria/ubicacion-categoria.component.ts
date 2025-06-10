import { Component, OnInit } from '@angular/core';
import { ServicesBDService } from '../../services/services-bd.service';
import { Ubicacion } from '../../interface/ubicacion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ubicacion-categoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ubicacion-categoria.component.html',
  styleUrl: './ubicacion-categoria.component.css'
})
export class UbicacionCategoriaComponent implements OnInit{

  constructor(private db: ServicesBDService){}

  ubicacion: Ubicacion[] = [];
  ngOnInit(): void {
    this.db.getUbicacion().subscribe(data => {
      this.ubicacion = data
    })
    
  }

}

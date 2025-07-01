import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ServicesBDService } from '../../services/services-bd.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {

  compras:any[]= []


  constructor(private db: ServicesBDService) {}

  ngOnInit() {
    this.cargarCompras();
  }

  cargarCompras() {
    this.db.getCompras().subscribe({
      next: (res) => {
        this.compras = res;
      },
      error: () => {
        alert('❌ Error al obtener compras');
      }
    });
  }

  aprobarCompra(id: string) {
    if (confirm('¿Estás seguro de aprobar esta compra?')) {
      this.db.aprobarCompra(id).subscribe({
        next: () => {
          alert('✅ Compra aprobada');
          this.cargarCompras(); // recarga lista
        },
        error: () => alert('❌ Error al aprobar compra')
      });
    }
  }

}

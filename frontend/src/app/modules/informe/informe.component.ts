import { Ubicacion } from './../../interface/ubicacion';
import { autoTable } from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { Component, OnInit } from '@angular/core';
import { ServicesBDService } from '../../services/services-bd.service';
import { Producto } from '../../interface/producto';
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Categoria } from '../../interface/categoria';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-informe',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './informe.component.html',
  styleUrl: './informe.component.css'
})
export class InformeComponent implements OnInit{

  productos: Producto[] = [];
  categorias: Categoria[] = []
  ubicacion : Ubicacion[] = []

  constructor(private prodService : ServicesBDService){}

  ngOnInit(): void {
  forkJoin({
    categorias: this.prodService.getCategorias(),
    ubicaciones: this.prodService.getUbicacion(),
    productos: this.prodService.getProductos()
  }).subscribe({
    next: ({ categorias, ubicaciones, productos }) => {
      this.categorias = categorias;
      this.ubicacion = ubicaciones;
      this.productos = productos.map((prod: any) => ({
        ...prod,
        categoria: typeof prod.categoria === 'string' 
          ? this.categorias.find(c => c._id === prod.categoria) || { nombreCategoria: 'Sin Categoría', _id: '' }
          : prod.categoria,
        ubicacion: typeof prod.ubicacion === 'string'
          ? this.ubicacion.find(u => u._id === prod.ubicacion) || { nombreUbicacion: 'Sin ubicación', _id: '' }
          : prod.ubicacion
      }));
    },
    error: err => {
      console.error('Error al cargar datos del informe:', err);
    }
  });
}

  



cargarProductos() {
  this.prodService.getProductos().subscribe({
  next: (res: any) => {
    // Aquí accedes al array productos dentro del objeto res
    this.productos = res.productos.map((prod: any) => ({
      ...prod,
      categoria: typeof prod.categoria === 'string' 
        ? this.categorias.find(c => c._id === prod.categoria) || { nombreCategoria: 'Sin Categoría', _id: '' }
        : prod.categoria
    }));
    // Si quieres, puedes manejar las alertas con res.alertas
  },
  error: () => {
    alert('Error al obtener productos');
  }
});

}

cargarUbicacion(){
    this.prodService.getUbicacion().subscribe({
      next:(data: Ubicacion[]) =>{
        this.ubicacion = data
        console.log('ubicaciones', data)
      },
      error:(error) => {
        console.error('Error al cargar ubicaciones:', error)
      }
    })
  }

getNombreUbicacion(ubicacion: string | Ubicacion): string {
  if (typeof ubicacion === 'string') {
    // Aquí podrías buscar el nombre en this.categorias si tienes el id
    const ubi = this.ubicacion.find(ubi => ubi._id === ubicacion);
    return ubi ? ubi.nombreUbicacion : 'Sin ubicacion';
  } else {
    return ubicacion?.nombreUbicacion || 'Sin ubicacion';
  }
}
getNombreCategoria(categoria: string | Categoria): string {
  if (typeof categoria === 'string') {
    // Aquí podrías buscar el nombre en this.categorias si tienes el id
    const cat = this.categorias.find(c => c._id === categoria);
    return cat ? cat.nombreCategoria : 'Sin Categoría';
  } else {
    return categoria?.nombreCategoria || 'Sin Categoría';
  }
}



  cargarCategorias(){
        this.prodService.getCategorias().subscribe({
          next:(data: Categoria[]) =>{
            this.categorias = data
          },
          error:(error) =>{
            console.error('Error al cargar categorias: ',error)
    
          }
        });
      }

  exportarPDF():void{
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Maestranza Unidos S.A', 14,15);
    doc.setFontSize(12);
    doc.text('Reporte de inventario', 14,25);

    const body = this.productos.map(prod => [
    prod.codigo,
    prod.nombre,
    typeof prod.categoria === 'string' ? prod.categoria : prod.categoria?.nombreCategoria || 'Sin Categoría',
    prod.stock,
    prod.ubicacion,
  ]);
    autoTable(doc, {
      head:[['Codigo', 'Nombre', 'Categoria', 'stock', 'Precio']],
      body,
      startY:30,
    });
    doc.save('reporte_inventario_maestranza.pdf');
  }

  exportarExcel(){
    const ws = XLSX.utils.json_to_sheet(this.productos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws, 'Inventario');

    const excelBuffer: any = XLSX.write(wb,{
      bookType:'xlsx',
      type:'array'
    });

    const blob = new Blob([excelBuffer],{
      type:'aplication(octet-stream',
    });
    saveAs(blob, 'reporte_inventario_maestranza.xlsx')
  }

}

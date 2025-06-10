import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import { Producto } from "../../interface/producto";
import { ActivatedRoute, Router } from "@angular/router";
import { ServicesBDService } from "../../services/services-bd.service";
import { FormsModule } from "@angular/forms";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { Categoria } from '../../interface/categoria';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Ubicacion } from '../../interface/ubicacion';




@Component({
    selector: 'app-edit-product',
    standalone: true,
    imports: [FormsModule,
        MatIcon,
        MatIconModule,
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        HttpClientModule, 
        MatSelectModule,
        MatOptionModule,
        MatFormFieldModule
    ],
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{

    producto: Producto = {
    _id: '',
    codigo: '',
    nombre: '',
    stock: 0,
    categoria: '',
    ubicacion: '',
    foto: null
  };

  categoriaSeleccionada: string = "";
  nombreCategoriaSeleccionada: string = ""; // Agregar esta propiedad
  productoId: string = '';
  categorias: Categoria[] = [];
  imagePreview: string | null = null;
  ubicacion : Ubicacion[] = []

  constructor(
    private route: ActivatedRoute,
    private prodService: ServicesBDService,
    private router: Router
  ) {}




  ngOnInit(): void {
    this.cargarCategorias(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.prodService.getProductoPorId(id).subscribe(data => {
          console.log('🔍 Producto recibido:', data);
          this.producto = data;
          
          // Manejar categoría que puede venir como objeto o string
          if (this.producto.categoria) {
            if (typeof this.producto.categoria === 'object') {
              // Viene con populate (es un objeto Categoria)
              const cat = this.producto.categoria as Categoria;
              this.categoriaSeleccionada = cat._id;
              this.nombreCategoriaSeleccionada = cat.nombreCategoria;
            } else {
              // Viene como string (solo el ID)
              this.categoriaSeleccionada = this.producto.categoria as string;
              this.actualizarNombreCategoria();
            }
          }
        });
      }
    });
    this.cargarUbicacion();
  }

  cargarCategorias(callback?: () => void): void {
  this.prodService.getCategorias().subscribe({
    next: (categorias) => {
      this.categorias = categorias;
      console.log('📂 Categorías cargadas:', categorias);
      if (callback) {
        callback();
      }
    },
    error: (error) => {
      console.error('❌ Error al cargar categorías:', error);
    }
  });
};

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

  actualizarNombreCategoria() {
    if (this.categoriaSeleccionada && this.categoriaSeleccionada !== '') {
      const categoria = this.categorias.find(cat => cat._id === this.categoriaSeleccionada);
      this.nombreCategoriaSeleccionada = categoria ? categoria.nombreCategoria : 'Categoría no encontrada';
    } else {
      this.nombreCategoriaSeleccionada = 'Sin categoría';
    }
  }

  getNombreCategoria(categoria: string | Categoria | null): string {
    if (!categoria) {
      return 'Sin categoría';
    }

    // Si es un objeto Categoria (viene con populate)
    if (typeof categoria === 'object' && 'nombreCategoria' in categoria) {
      return categoria.nombreCategoria;
    }
    
    // Si es un string (ID de categoría)
    if (typeof categoria === 'string' && this.categorias.length > 0) {
      const cat = this.categorias.find(c => c._id === categoria);
      return cat ? cat.nombreCategoria : 'Categoría no encontrada';
    }
    
    return 'Sin categoría';
  }

  onCategoriaChange() {
    this.actualizarNombreCategoria();
    // Actualizar como string (ID) porque eso es lo que necesita el backend
    this.producto.categoria = this.categoriaSeleccionada;
  }

  guardarCambios() {
    // Asegurar que categoria sea string (ID) para el backend
    const productoParaGuardar = {
      ...this.producto,
      categoria: this.categoriaSeleccionada // Siempre como string
    };
    
    this.prodService.updateProducto(productoParaGuardar._id, productoParaGuardar).subscribe(() => {
      alert('Producto Actualizado');
    });
  }

}
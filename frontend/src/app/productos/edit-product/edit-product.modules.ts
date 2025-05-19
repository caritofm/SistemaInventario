import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule,  } from '@angular/material/icon';







@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, CommonModule,MatCardModule,MatInputModule
    , MatButtonModule, MatIconModule, MatIcon
  ],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent{
    producto = {
    codigo: 'A8889',
    nombre: 'Fierros',
    descripcion: 'Fierros para construcción',
    stock: 200,
    Ubicacion:'Bodega A200'
  };

  guardarCambios() {
    console.log('Producto modificado:', this.producto);
    // Aquí puedes llamar a tu servicio para enviar los cambios al backend
  }
}
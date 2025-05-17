import { Background } from './../../../../node_modules/lightningcss/node/ast.d';
import { style } from '@angular/animations';
import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatCardModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  constructor(private snackbar:MatSnackBar){}

  codigo: string = "";
  descripcion: string = "";
  stock :string = "";
  ubicacion :string = "";
  showAlert( text:string, button:string){
    this.snackbar.open(text, button,{
      duration:3000,
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass:['custom-snackbar']
    });
  }

  guadarProducto(){
    if(this.codigo.trim()|| this.descripcion.trim() || this.stock.trim()|| this.ubicacion.trim()){
      console.log('Datos ingresados');
      this.showAlert('Se ha agregado correctamente', 'Aceptar')
    }else{
      console.log('Datos no ingresados')
      this.showAlert('Recuerde ingresar todos los campos', 'Aceptar');
    }
  }



}

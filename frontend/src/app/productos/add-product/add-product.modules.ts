import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";


@Component({
    selector: 'app-add-product',
    standalone: true,
    imports: [FormsModule, MatCardModule],
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})

export class AddProductComponent{
  codigo: string = "";
  descripcion: string = "";
  stock :string = "";
  ubicacion :string = "";

  guadarProducto(){
    if(this.codigo ==="" || this.descripcion === "" || this.stock === ""|| this.ubicacion ===""){
      console.log('Datos no ingresados')
    }
  }
}
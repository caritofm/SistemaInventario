import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { ServicesBDService } from "../../services/services-bd.service";
import { Producto } from "../../interface/producto";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClientModule } from "@angular/common/http";
@Component({
    selector: 'app-add-product',
    standalone: true,
    imports: [FormsModule, MatCardModule, HttpClientModule],
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})

export class AddProductComponent {
  productos: Producto[] = [];

  constructor(private servicebd :ServicesBDService, private snackbar: MatSnackBar){}
  nuevoProducto :Producto = {_id:'',codigo:'', nombre:'', categoria: '',stock:0, ubicacion:'' }
  selectedFile: File | null = null;
  imagePreview : string | null = null;
  
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
  onFileSelected(event:any):void{
  const file = event.target.files[0];
  if(file){
    this.selectedFile = file;
    this.nuevoProducto.foto = file; // Sincroniza ambos

    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file)
  }
}

  agregarProducto(){
  if( this.nuevoProducto.codigo.trim() === ''||
      this.nuevoProducto.nombre.trim()=== ''||
      this.nuevoProducto.categoria.trim() ===''||
      this.nuevoProducto.stock <= 0  ||
      this.nuevoProducto.ubicacion.trim() === ''
    ){
      this.showAlert('Recuerde ingresar todos los campos correctamente', 'Aceptar')
      return;
    }
    
    const formData = new FormData();
    formData.append('codigo', this.nuevoProducto.codigo);      // Cambié 'Codigo' por 'codigo'
    formData.append('nombre', this.nuevoProducto.nombre);      // Cambié 'Nombre' por 'nombre'
    formData.append('categoria', this.nuevoProducto.categoria);
    formData.append('stock', this.nuevoProducto.stock.toString());
    formData.append('ubicacion', this.nuevoProducto.ubicacion);
    
    if(this.selectedFile){  // Usa selectedFile en lugar de nuevoProducto.foto
      formData.append('foto', this.selectedFile, this.selectedFile.name);
    }
    
    // AQUÍ ESTÁ EL CAMBIO PRINCIPAL - envía formData en lugar de nuevoProducto
    this.servicebd.addProducto(formData).subscribe(producto =>{
      this.productos.push(producto);
      this.showAlert('Producto agregado correctamente', 'Aceptar');
      this.nuevoProducto = {_id: '',codigo:'', nombre:'', categoria: '', stock:0, ubicacion:'', foto:null};
      this.imagePreview = null;
      this.selectedFile = null; // Limpia también selectedFile

      const fileInput = document.getElementById('foto') as HTMLInputElement;
      if(fileInput){
        fileInput.value = ''
      }
    }, error =>{
      this.showAlert('Error al agregar producto', 'Aceptar');
      console.error('Status',error);
      console.error('Error completo',error);
      console.error('Mensaje de error en el backend',error.error);
    })
}




}
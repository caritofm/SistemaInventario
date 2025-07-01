import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { ServicesBDService } from "../../services/services-bd.service";
import { Producto } from "../../interface/producto";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Categoria } from "../../interface/categoria";
import { Ubicacion } from "../../interface/ubicacion";
@Component({
    selector: 'app-add-product',
    standalone: true,
    imports: [FormsModule, MatCardModule, HttpClientModule],
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit{
   productos: Producto[] = [];
    categoriaSelecionada : string = "";
    nuevoProducto :Producto = {_id:'',  codigo:'',nombre:'', categoria: '',stock:0, ubicacion:'', foto:null }
    categorias : Categoria[] = [];
    selectedFile: File | null = null;
    imagePreview : string | null = null;
    ubicacions :Ubicacion[] = []
    constructor(private snackbar:MatSnackBar, private http: HttpClient, private servicebd: ServicesBDService){}
  
    ngOnInit() {
    console.log('Iniciando carga de categorías...');
    
    this.servicebd.getCategorias().subscribe({
      next: (data: any) => {
        console.log('Datos recibidos:', data);
        console.log('Tipo de datos:', typeof data);
        console.log('Es array?', Array.isArray(data));
        
        // Ensure it's always an array
        if (Array.isArray(data)) {
          this.categorias = data;
        } else if (data && data.categorias && Array.isArray(data.categorias)) {
          // If the response is wrapped in an object
          this.categorias = data.categorias;
        } else {
          console.error('Los datos recibidos no son un array:', data);
          this.categorias = [];
        }
        
        console.log('Categorías finales:', this.categorias);
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.categorias = [];
        this.showAlert('Error al cargar categorías', 'Aceptar');
      }
    });
  
     this.servicebd.getUbicacion().subscribe((data:Ubicacion[]) => {
      console.log('Ubicaciones recibidas:', data);
      this.ubicacions = data;
    })
  
  
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
        this.nuevoProducto.categoria ===''||
        this.nuevoProducto.stock <= 0  ||
        this.nuevoProducto.ubicacion.trim() === ''
      ){
        this.showAlert('Recuerde ingresar todos los campos correctamente', 'Aceptar')
        return;
      }
  
      const categoriaId = typeof this.nuevoProducto.categoria === 'string' 
    ? this.nuevoProducto.categoria 
    : this.nuevoProducto.categoria._id;
  
  
        const formData = new FormData();
    formData.append('codigo', this.nuevoProducto.codigo);
    formData.append('nombre', this.nuevoProducto.nombre);
    formData.append('categoria', categoriaId);
    formData.append('stock', this.nuevoProducto.stock.toString());
    formData.append('ubicacion', this.nuevoProducto.ubicacion);
    
    console.log('FormData categoria:', formData.get('categoria'));
  
      
      
     
      if(this.selectedFile){  // Usa selectedFile en lugar de nuevoProducto.foto
        formData.append('foto', this.selectedFile, this.selectedFile.name);
      }
      // AQUÍ ESTÁ EL CAMBIO PRINCIPAL - envía formData en lugar de nuevoProducto
      this.servicebd.addProducto(formData).subscribe(producto =>{
        this.productos.push(producto);
        this.showAlert('Producto agregado correctamente', 'Aceptar');
        this.nuevoProducto = {_id:'',  codigo:'', nombre:'', categoria: '', stock:0, ubicacion:'', foto:null};
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
  

  



}
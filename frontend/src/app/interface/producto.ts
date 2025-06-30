import { Categoria } from "./categoria";
import { Ubicacion } from "./ubicacion";

export interface Producto {
  _id: string;
  codigo: string;
  nombre: string;
  stock: number;
  categoria: string | Categoria ;
  ubicacion: string;
  fechaVencimiento?: Date;
  foto: string | null;
}

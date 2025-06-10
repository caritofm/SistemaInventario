import { Producto } from "./producto";
import { Usuario } from "./usuario";

export interface Solicitud {
    _id?:string,
    usuario_id: string | Usuario;
    tipo: 'reposicion_stock' | 'nuevo_material' | 'retiro_bodega';
    materiales: {
        productoId: string | Producto;
        cantidad: number;
    }[];
}

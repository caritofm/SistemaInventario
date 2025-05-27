export interface Producto {
    _id:string,
    codigo:string,
    nombre:string,
    categoria:string,
    stock:number,
    ubicacion: string,
    foto?:File | null;
}

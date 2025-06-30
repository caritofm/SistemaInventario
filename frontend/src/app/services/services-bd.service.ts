import { Proveedores } from './../interface/proveedores';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Producto } from '../interface/producto';
import { Categoria} from '../interface/categoria';
import { Ubicacion } from '../interface/ubicacion';
import { Alerta} from '../interface/alerta';
import { Usuario } from '../interface/usuario';
import { Solicitud } from '../interface/solicitud';


@Injectable({
  providedIn: 'root'
})
export class ServicesBDService {
  private apiURL = 'http://localhost:3000/api/productos';
  private apiURLCategoria = 'http://localhost:3000/api/categoria';
  private apiURLUbicacion = 'http://localhost:3000/api/ubicacion';
  private apiURLSolicitud = 'http://localhost:3000/api/solicitud';
  private apiURLProveedores = 'http://localhost:3000/api/proveedores';
  private apiURLMovimientos = 'http://localhost:3000/api/movimientos';
  private apiURLBitacora = 'http://localhost:3000/api/bitacora';
  private apiURLOrdenCompras = 'http://localhost:3000/api/ordenCompra';
  private apiURLRecepcionCompra = 'http://localhost:3000/api/recepcion';
  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
  return this.http.get<{productos: Producto[], alertas: any[]}>(this.apiURL).pipe(
    map(res => res.productos)
  );
}

  getProductosConAlertas(): Observable<{productos: Producto[], alertas : Alerta[]}>{
    return this.http.get<{productos: Producto [], alertas: Alerta[]}>(this.apiURL)
  }
  getProductoPorId(id: string): Observable<Producto> {
  return this.http.get<Producto>(`${this.apiURL}/${id}`);
}

getTotalProductos(){
  return this.http.get<{ total: number }>('http://localhost:3000/api/productos/total');

}

getStockTotal() {
  return this.http.get<{ totalStock: number }>('http://localhost:3000/api/productos/stock-total');
}
  addProducto(producto: FormData): Observable<Producto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Producto>(this.apiURL, producto, { headers }).pipe(
      catchError(this.handleError) 
    );
  }

  deleteProducto(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiURL}/${id}`, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  updateProducto(id: string, producto: Producto): Observable<Producto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Producto>(`${this.apiURL}/${id}`, producto, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Error en el servicio:', error);
    return throwError(() => new Error(error.message || 'Error del servidor'));
  }

  //obtener las categorias 
  getCategorias():Observable<Categoria[]> {
      const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Categoria[]>(this.apiURLCategoria, {headers}).pipe(
      catchError(this.handleError)
    )

  }
  //obtener ubicacion
  getUbicacion():Observable<Ubicacion[]>{
      const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Ubicacion[]>(this.apiURLUbicacion, {headers}).pipe(
      catchError(this.handleError)
    )
  }
  //crear solicitud de materiales 

  CrearSolicitud(data: Solicitud): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post<any>(this.apiURLSolicitud, data, {headers}).pipe(
    catchError(this.handleError)
  );
}
  //obtener Solicitudes

  getSolicitudes():Observable<Solicitud[]>{
    const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Solicitud[]>(this.apiURLSolicitud, {headers});
  }
  //obtener usuarios
  getUsuario(_id: string): Observable<Usuario> {
  return this.http.get<Usuario>(`http://localhost:3000/api/auth/${_id}`);
}
//guardar proveedores
addProveedores(proveedor: FormData):Observable<Proveedores>{
  return this.http.post<Proveedores>(this.apiURLProveedores, proveedor).pipe(
    catchError(this.handleError)
  )
}

//obtener proveedores 

getProveedores():Observable <Proveedores[]>{
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<Proveedores[]>(this.apiURLProveedores, {headers}).pipe(
    catchError(this.handleError)
  )
}

//crear movimientos

addMovimientos( movimiento: any){
    const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post(this.apiURLMovimientos, movimiento, {headers})
}

getMovimientos(){
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<any>(this.apiURLMovimientos, {headers})
}

getTotalEntrada(){
    const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<{totalEntrada: number}>('http://localhost:3000/api/movimientos/entrada/total', {headers});
}

getTotalSalida(){
    const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<{salidaTotal: number}>('http://localhost:3000/api/movimientos/salida/total', {headers})
}

deleteSolicitud(id:string){
  return this.http.delete<{message:string, _id:string}>(`${this.apiURLSolicitud}/${id}`);
}


aprobarSolicitud(id: string) {
  return this.http.post(`${this.apiURLSolicitud}/aprobar/${id}`, {});
}

rechazarSolicitud(id: string) {
  return this.http.post(`${this.apiURLSolicitud}/rechazar/${id}`, {});
}

getTotalSolicitudes() {
    const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<{ totalSolicitudes: number }>('http://localhost:3000/api/solicitud/total', {headers});
}

getNotificacionesPorUsuario(usuario_id: string):Observable<Alerta[]> {
  return this.http.get<Alerta[]>(`http://localhost:3000/api/notificaciones/${usuario_id}`);
}
obtenerBitacora(): Observable<any[]> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<any[]>(this.apiURLBitacora, { headers });
  }
  getProductosPorCategoria(categoriaId: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiURL}/categoria/${categoriaId}`, {headers});
  }
    getUbicaciones() {
        const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiURLUbicacion}/ubicaciones`, {headers});
  }
  getFechaVencimiento(){
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<{ productos: Producto[] }>(`${this.apiURL}`, {headers});
}

crearCompra(data: any){
  return this.http.post(`${this.apiURLOrdenCompras}`, data)
}

getCompras() {
  return this.http.get<any[]>(`${this.apiURLOrdenCompras}`);
}

aprobarCompra(id: string) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.put(`${this.apiURLOrdenCompras}/aprobar/${id}`, {}, {headers});
}

getUltimaBitacora() {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<any[]>(`${this.apiURLBitacora}/ultimas`,{headers});
}





}
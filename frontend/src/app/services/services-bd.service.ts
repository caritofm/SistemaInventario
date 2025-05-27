import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Producto } from '../interface/producto';

@Injectable({
  providedIn: 'root'
})
export class ServicesBDService {
  private apiURL= 'http://localhost:3000/api/productos'

  constructor(private http: HttpClient) { }

  getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.apiURL);
  }

  addProducto(producto: FormData):Observable<Producto>{
    return this.http.post<Producto>(this.apiURL, producto);

  }

  deleteProducto(id: string):Observable<any>{
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}

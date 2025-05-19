import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor() { }

  getRol():string | null{
    return localStorage.getItem('rol');
  }
}

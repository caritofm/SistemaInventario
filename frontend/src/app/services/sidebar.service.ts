import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor( ) { }

  private isOpenSubject = new BehaviorSubject<boolean>(this.getInitialState());
  isOpen$ = this.isOpenSubject.asObservable();

  toggle() {
    const newState = !this.isOpenSubject.value;
    this.isOpenSubject.next(newState);
    this.saveState(newState);
  }

  setOpen(value: boolean) {
    this.isOpenSubject.next(value);
    this.saveState(value);
  }

  private getInitialState(): boolean {
    const saved = localStorage.getItem('sidebar_state');
    return saved !== null ? JSON.parse(saved) : true;
  }

  private saveState(state: boolean) {
    localStorage.setItem('sidebar_state', JSON.stringify(state));
  }
}

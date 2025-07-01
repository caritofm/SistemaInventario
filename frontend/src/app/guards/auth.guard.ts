// auth.guard.ts
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const usuario_id = localStorage.getItem('_id') || 'Usuario';
  if (usuario_id) {
    return true;
  }
  window.location.href = '/login';
  return false;
};


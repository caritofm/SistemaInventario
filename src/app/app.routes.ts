import { LayoutComponent } from './shared/component/layout/layout.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
        import('./modules/login/login.component').then(m => m.LoginComponent),
    },

    {
        path:'',
        loadComponent:() =>
            import ('./shared/component/layout/layout.component').then(m => m.LayoutComponent),
        children :
        [
            {
                path:'registro-productos',
                loadComponent : () => 
                    import ('./modules/registro-productos/registro-productos.component').then(m => m.RegistroProductosComponent),
            },
            {
                path: 'carrito',
                loadComponent: () =>
                    import('./modules/carrito/carrito.component').then(m => m.CarritoComponent),
            },
            {
                path:'admin',
                loadComponent:() => 
                    import ('./modules/admin/admin.component').then( m => m.AdminComponent),
            }
        ]
    }
    
];


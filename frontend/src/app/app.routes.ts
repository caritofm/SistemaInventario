import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
    {
        path:'',
        component:LayoutComponent,
        children: [
            {
                path:'principal',
                loadComponent:() =>
                    import('./modules/principal/principal.component').then(m => m.PrincipalComponent),
            },
            {
                path:'colaboradores',
                loadComponent: () =>
                    import('./modules/colaboradores/colaboradores.component').then(m => m.ColaboradoresComponent),
            },
            {
                path:'productos',
                loadComponent:() =>
                    import('./modules/productos/productos.component').then(m => m.ProductosComponent),
            },
            {
                path:'provedores',
                loadComponent:()=>
                    import('./modules/provedores/provedores.component').then(m => m.ProvedoresComponent),
            }

        ],
       
    },
    {
        path:'login',
        loadComponent:() =>
            import('./modules/login/login.component').then(m => m.LoginComponent)
    },

     {
            path:'venc-lotes',
            loadComponent:() =>
                import('./productos/venc-lotes/venc-lotes.component').then(m => m.VencLotesComponent),
        },
   
    
];

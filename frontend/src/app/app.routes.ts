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
        {
            path:'add-product',
            loadComponent:() =>
                import('./productos/add-product/add-product.component').then(m =>m.AddProductComponent),       
        },
        {
            path:'delete-product',
            loadComponent:() =>
                import('./productos/delete-product/delete-product.component').then(m => m.DeleteProductComponent),
        },
        {
            path:'edit-product',
            loadComponent:() =>
                import('./productos/edit-product/edit-product.component').then(m=>m.EditProductComponent),
        },
        {
            path:'alert-stock',
            loadComponent:() => 
                import('./productos/alert-stock/alert-stock.component').then(m =>m.AlertStockComponent),
        }
   
    
];

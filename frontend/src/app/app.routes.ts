import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'principal', pathMatch: 'full' },

      {
        path: 'principal',
        canActivate:[authGuard],
        loadComponent: () =>
          import('./modules/principal/principal.component').then(m => m.PrincipalComponent),
      },
      {
        path:'bitacora',
        canActivate:[authGuard],
        loadComponent:() =>
          import('./modules/bitacora/bitacora.component').then(m => m.BitacoraComponent),
      },
      {
        path: 'informe',
        canActivate:[authGuard],
        loadComponent: () =>
          import('./modules/informe/informe.component').then(m => m.InformeComponent),
      },
      {
        path:'carrito',
        canActivate:[authGuard],
        loadComponent:() => 
          import('./comprador/carrito/carrito.component').then(m => m.CarritoComponent),
      },
        {
        path:'productos',
        canActivate:[authGuard],
        loadComponent:() =>
          import('./comprador/productos/productos.component').then(m => m.ProductosComponent),
        },
      {
        path:'ubicacion-categoria',
        canActivate:[authGuard],
        loadComponent:() =>
          import('./modules/ubicacion-categoria/ubicacion-categoria.component').then(m => m.UbicacionCategoriaComponent)
      },
      {
        path: 'provedores',
        canActivate:[authGuard],
        loadComponent: () =>
          import('./modules/provedores/provedores.component').then(m => m.ProvedoresComponent),
      },
      {
        path: 'lista-provedores',
        canActivate:[authGuard],
        loadComponent: () =>
          import('./modules/lista-provedores/lista-provedores.component').then(m => m.ListaProvedoresComponent),
      },
      {
        path:'ver-solicitud',
        canActivate:[authGuard],
        loadComponent:() => 
          import('./modules/ver-solicitud/ver-solicitud.component').then(m => m.VerSolicitudComponent ),
      },
      {
        path:'ver-movimientos',
        canActivate:[authGuard],
        loadComponent:() =>
          import('./modules/ver-movimientos/ver-movimientos.component').then(m => m.VerMovimientosComponent)
      },
      {
        path:'ubicaciones',
        canActivate:[authGuard],
        loadComponent:() =>
          import('./modules/ubicaciones/ubicaciones.component').then(m => m.UbicacionesComponent)
      },
      {
        path: 'venc-lotes',
        canActivate:[authGuard],
        loadComponent: () =>
          import('./productos/venc-lotes/venc-lotes.component').then(m => m.VencLotesComponent),
      },
      {
        path: 'add-product',
        canActivate:[authGuard],
        loadComponent: () =>
          import('./productos/add-product/add-product.component').then(m => m.AddProductComponent),
      },
      {
        path: 'delete-product',
        canActivate:[authGuard],
        loadComponent: () =>
          import('./productos/delete-product/delete-product.component').then(m => m.DeleteProductComponent),
      },
      {
        path: 'edit-product/:id',
        canActivate:[authGuard],
        loadComponent: () =>
          import('./productos/edit-product/edit-product.component').then(m => m.EditProductComponent),
      },
      {
        path: 'alert-stock',
        canActivate:[authGuard],
        loadComponent: () =>
          import('./productos/alert-stock/alert-stock.component').then(m => m.AlertStockComponent),
      },
      {
        path: 'enviar-solicitud-materiales',
        canActivate:[authGuard],
        loadComponent: () =>
          import('./modules/enviar-solicitud-materiales/enviar-solicitud-materiales.component').then(m => m.EnviarSolicitudMaterialesComponent),
      },
      {
        path: 'movimientos-materiales',
        canActivate:[authGuard],
        loadComponent: () =>
          import('./modules/movimientos-materiales/movimientos-materiales.component').then(m => m.MovimientosMaterialesComponent),
      },
      {
        path: 'notificacion',
        canActivate:[authGuard],
        loadComponent: () =>
          import('./modules/notificacion/notificacion.component').then(m => m.NotificacionComponent),
      }
      
    ]
  },

  {
    path:'login',
    loadComponent:() =>
      import('./modules/login/login.component').then(m => m.LoginComponent)
  },

  { path: '**', redirectTo: 'login' }
];

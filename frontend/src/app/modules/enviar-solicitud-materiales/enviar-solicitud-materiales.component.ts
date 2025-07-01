import { Component, OnInit } from '@angular/core';
import { ServicesBDService } from '../../services/services-bd.service';
import { Producto } from '../../interface/producto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Solicitud } from '../../interface/solicitud';

@Component({
  selector: 'app-enviar-solicitud-materiales',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButton],
  templateUrl: './enviar-solicitud-materiales.component.html',
  styleUrl: './enviar-solicitud-materiales.component.css'
})
export class EnviarSolicitudMaterialesComponent implements OnInit {

  constructor(private db: ServicesBDService) {}

  productos: (Producto & { cantidadSolicitada: number })[] = [];
  
  usuarioId: string = '';
  usuarioNombre: string = '';
  tiposSolicitud: string[] = ['reposicion_stock', 'nuevo_material', 'retiro_bodega'];

  solicitudReposicion = {
    usuarioId: '',
    tipo: '',
    materiales: [] as {
      productoId: string,
      codigo: string;
      cantidadActual: number;
      cantidadSolicitada: number;
      justificacion?: string;
    }[]
  };
  ngOnInit(): void {
  try {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuarioId = usuario._id || usuario.id || ''; // Ajusta según cómo guardas los datos
      this.usuarioNombre = usuario.nombre || '';         // También puede ser `usuario.nombreCompleto`
      console.log('Usuario cargado:', this.usuarioNombre);
    } else {
      console.warn('No hay usuario en localStorage');
    }
  
    this.cargarProductos();
    
  } catch (error) {
    console.error('Error al parsear datos de usuario:', error);
    // Limpiar localStorage corrupto
    localStorage.removeItem('usuario');
    // Redirigir al login
  }
}

private cargarProductos(): void {
  this.db.getProductos().subscribe({
    next: (res: Producto[]) => {
      this.productos = res
        .filter(p => p.stock >= 0)
        .map(p => ({ ...p, cantidadSolicitada: 0 }));
    },
    error: err => console.error('Error al cargar productos:', err)
  });
}


  solicitarMasStock(codigo: string, cantidadSolicitada: number) {
    if (!cantidadSolicitada || cantidadSolicitada <= 0) {
      alert('Debe ingresar una cantidad válida');
      return;
    }

    const productoActual = this.productos.find(p => p.codigo === codigo);
    if (!productoActual) {
      alert('Producto no encontrado');
      return;
    }

    const solicitudExistente = this.solicitudReposicion.materiales.find(m => m.codigo === codigo);

    if (solicitudExistente) {
      solicitudExistente.cantidadSolicitada += cantidadSolicitada;
    } else {
      this.solicitudReposicion.materiales.push({
        productoId: productoActual._id, // ⚠️ Asegúrate que el producto tenga _id
        codigo,
        cantidadActual: productoActual.stock,
        cantidadSolicitada,
        justificacion: `Reposición de stock - Stock actual: ${productoActual.stock}`
});
     
    }

    productoActual.cantidadSolicitada = 0;
  }

enviarSolicitudReposicion() {
  console.log('=== FRONTEND DEBUG ===');
  console.log('1. usuarioId original:', this.usuarioId);
  console.log('2. Tipo de usuarioId:', typeof this.usuarioId);
  
  if (!this.usuarioId) {
    alert('Error: No se ha identificado el usuario. Por favor, inicie sesión nuevamente.');
    return;
  }

  const solicitud: Solicitud = {
    usuario_id: this.usuarioId,
    tipo: this.solicitudReposicion.tipo as 'reposicion_stock' | 'nuevo_material' | 'retiro_bodega',
    materiales: this.solicitudReposicion.materiales.map(m => ({
      productoId: m.productoId,
      cantidad: m.cantidadSolicitada
    }))
  };

  console.log('3. Solicitud final antes de enviar:', JSON.stringify(solicitud, null, 2));

  this.db.CrearSolicitud(solicitud).subscribe({
    next: (response) => {
      console.log('4. ✅ Respuesta exitosa del backend:', response);
      alert('Solicitud enviada exitosamente.');
      this.limpiarSolicitud();
    },
    error: (err) => {
      console.log('5. ❌ Error del backend:');
      console.error('Error completo:', err);
      console.error('Status:', err.status);
      console.error('Message:', err.message);
      console.error('Error body:', err.error);
      alert('Error al enviar la solicitud.');
    }
  });
}


 
  limpiarSolicitud(): void {
    this.solicitudReposicion.materiales = [];
    this.productos.forEach(p => p.cantidadSolicitada = 0);
  }

  necesitaReposicion(stock: number, minimoRecomendado: number = 50): boolean {
    return stock <= minimoRecomendado;
  }

  getNivelStock(stock: number): string {
    if (stock === 0) return 'Sin stock';
    if (stock <= 5) return 'Stock crítico';
    if (stock <= 15) return 'Stock bajo';
    return 'Stock normal';
  }

  getStockClass(stock: number): string {
    if (stock === 0) return 'stock-agotado';
    if (stock <= 5) return 'stock-critico';
    if (stock <= 15) return 'stock-bajo';
    return 'stock-normal';
  }
}

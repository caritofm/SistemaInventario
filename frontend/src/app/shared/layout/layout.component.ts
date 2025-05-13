import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HostListener } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,ToolbarComponent,MatToolbarModule, SidebarComponent, CommonModule,MatSidenavModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isSidebarOpen = true;
  isMobile = false;

  constructor() {
    this.checkIfMobile();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 1150;
  }
  toggleSidebar() {
    if (this.isMobile) {
      // En mobile simplemente mostramos/ocultamos
      this.isSidebarOpen = !this.isSidebarOpen;
    } else {
      // En desktop, seguimos cambiando el grid
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }

}

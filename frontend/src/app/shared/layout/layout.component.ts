import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    ToolbarComponent,
    MatToolbarModule,
    SidebarComponent,
    CommonModule,
    MatSidenavModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  isMobile = false;

  constructor(public sidebarService: SidebarService) {
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
    this.sidebarService.toggle();
  }
}


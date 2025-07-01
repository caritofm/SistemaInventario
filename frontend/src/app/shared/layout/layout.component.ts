import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidebarService } from '../../services/sidebar.service';
import { AuthserviceService } from '../../services/authservice.service';


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
    RouterModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  role: string | null = null;
   usuarioRol = localStorage.getItem('usuarioRol') || 'usuario';
  constructor(private router: Router, private auth: AuthserviceService){}

  ngOnInit(): void {
    this.role = this.auth.getRol();
    
  }

   toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    navMenu?.classList.toggle('active');
    hamburger?.classList.toggle('active');
  }

  toggleDropdown(dropdownId: string) {
    if (window.innerWidth <= 768) {
      const dropdown = document.getElementById(dropdownId);
      dropdown?.classList.toggle('active');
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])

  }

  
  
}


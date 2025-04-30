import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'
import { ToolbarComponent } from '../toolbar/toolbar.component';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, 
            CommonModule, 
            RouterModule, 
            MatToolbarModule,
            ToolbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  isSidebarOpen = true;

  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}

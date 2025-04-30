import { Component, EventEmitter, Output } from '@angular/core';
import {MatIcon} from '@angular/material/icon'
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatIcon, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  @Output() toggle = new EventEmitter<void>();

  toggleSidebar(){
    this.toggle.emit();
  }

}

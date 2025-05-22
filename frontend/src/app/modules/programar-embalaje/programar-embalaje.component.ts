import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-programar-embalaje',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatSelectModule],
  templateUrl: './programar-embalaje.component.html',
  styleUrl: './programar-embalaje.component.css'
})
export class ProgramarEmbalajeComponent {

}

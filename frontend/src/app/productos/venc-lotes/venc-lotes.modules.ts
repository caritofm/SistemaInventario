import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { matTooltipAnimations, MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-venc-lotes',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatIconModule, MatButtonModule,MatTooltipModule, CommonModule],
  templateUrl: './venc-lotes.component.html',
  styleUrls: ['./venc-lotes.component.css']
})
export class VencLotesComponent {}
import { Component } from '@angular/core';
import{ NgxChartsModule} from '@swimlane/ngx-charts'
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [NgxChartsModule,MatIcon, MatCardModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  
}

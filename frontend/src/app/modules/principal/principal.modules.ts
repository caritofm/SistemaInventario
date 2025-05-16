import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import{ NgxChartsModule} from '@swimlane/ngx-charts';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, MatIcon, NgxChartsModule, MatCardModule, FormsModule,MatInputModule, MatSelectModule,MatFormFieldModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
    data = [
  { "name": "Enero", "value": 5000 },
  { "name": "Febrero", "value": 7200 },
  { "name": "Marzo", "value": 6200 },
];

}
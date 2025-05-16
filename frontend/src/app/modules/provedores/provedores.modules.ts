import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, MatIcon,MatButtonModule, MatCardModule],
  templateUrl: './provedores.component.html',
  styleUrls: ['./provedores.component.css']
})
export class PrincipalComponent {
   

}
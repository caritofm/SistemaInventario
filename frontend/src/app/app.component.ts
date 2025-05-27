import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddProductComponent } from "./productos/add-product/add-product.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}

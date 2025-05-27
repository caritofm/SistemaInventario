import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { importProvidersFrom, NgModule } from '@angular/core';
import { AddProductComponent } from './productos/add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,  // <-- AQUI
    RouterOutlet
  ],
  bootstrap: [AppModule]
})
export class AppModule { }

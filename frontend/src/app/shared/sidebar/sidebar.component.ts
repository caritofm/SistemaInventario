import { Component, OnInit } from '@angular/core';
import { MatListItem } from '@angular/material/list';
import { MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { AuthserviceService } from '../../services/authservice.service';
import{MatExpansionModule} from '@angular/material/expansion'
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListItem,MatNavList, MatExpansionModule ,CommonModule,RouterModule,MatIcon],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent{
  rol: string |null = null

  constructor(private authServive: AuthserviceService){}

  ngOnInit():void{
    this.rol = this.authServive.getRol();
  }


}

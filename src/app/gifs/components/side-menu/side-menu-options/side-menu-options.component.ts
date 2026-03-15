import { GifsService } from './../../../services/gifs.service';
import { Component, inject, signal } from '@angular/core';
import { MenuItem } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'gifs-side-menu-options',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
  styles: ``
})
export class SideMenuOptionsComponent {

   public menu: MenuItem[] = [
     {label:'Search', subLabel: 'search', route:'/dashboard/search', icon:'fa-solid fa-chart-line'},
     {label:'Trending', subLabel:'gifs', route:'/dashboard/trending', icon:'fa-solid fa-magnifying-glass'},
  ]

  gifService = inject(GifsService);



}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "../../components/side-menu/side-menu.component";

@Component({
  selector: 'gifs-dashboard-page',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './dashboard-page.component.html',
  styles: ``
})
export default class DashboardPageComponent {

}

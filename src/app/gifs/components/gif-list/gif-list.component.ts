import { Component, input } from '@angular/core';
import { GifListItemComponent } from "./gif-list-item/gif-list-item.component";
import { Gif } from '../../interfaces';

@Component({
  selector: 'gif-list',
  imports: [GifListItemComponent],
  templateUrl: './gif-list.component.html',
  styles: ``
})
export class GifListComponent {

  gifList = input.required<Gif[]>();

}

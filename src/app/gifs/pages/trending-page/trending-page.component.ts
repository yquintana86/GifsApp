import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces';



@Component({
  imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
  styles: ``
})
export default class TrendingPageComponent implements OnInit  {

   #gifService = inject(GifsService);
   #gifList = signal<Gif[]>([]);
    gifList = computed(() => this.#gifList());

  ngOnInit(): void {
    this.#gifService.loadTrendingGifs()
                    .subscribe(resp => {
                      this.#gifList.set(resp);
                    });
  }
}

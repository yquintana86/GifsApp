import { Component, inject } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  styles: ``,
})
export default class SearchPageComponent {

  gifService = inject(GifsService);
  gifList: Gif[] = [];


  public searchByTerm(term: string): void{
      if(!term){
        this.gifList = [];
        return;
      }

      this.gifService.searchByTerm(term)
                        .subscribe({
                            next: (resp) => {
                              if(resp){
                                this.gifList = resp;
                              }
                            },
                            error:(error) => {
                              this.gifList = [];
                            }
                          });

  }

}

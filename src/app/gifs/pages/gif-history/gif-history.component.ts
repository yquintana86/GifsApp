import { Component, inject, OnInit, signal } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { ActivatedRoute } from '@angular/router';
import { Gif } from '../../interfaces';
import { catchError, map } from 'rxjs';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
  styles: ``
})
export default class GifHistoryComponent implements OnInit {

  gifsService = inject(GifsService);
  activatedRoute = inject(ActivatedRoute);
  gifList = signal<Gif[]>([]);


  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map((params) => params['query'])
       ).subscribe( query => {
        this.gifList.set(this.gifsService.getHistoryGifs(query) ?? []);
       });
      }

}

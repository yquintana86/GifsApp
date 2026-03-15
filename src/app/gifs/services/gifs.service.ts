import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { GiphyResponse } from '../interfaces';
import { Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  readonly #baseUrl = environment.giphyApiUrl;
  #_httpClient = inject(HttpClient);
  #searchHistory = signal<Record<string, Gif[]>>(this.loadSearchHistory());
  searchHistoryKeys = computed(() => Object.keys(this.#searchHistory()));

  updateSearchhistory = effect(() => {
    const stringGifs = JSON.stringify(this.#searchHistory());
    localStorage.setItem('history',stringGifs);
  });

  loadSearchHistory(): Record<string, Gif[]>{
    const gifsFromStorage = localStorage.getItem('history') ?? '{}';
    const gifs = JSON.parse(gifsFromStorage);
    return gifs;
  }


  public loadTrendingGifs(): Observable<Gif[]> {

    return this.#_httpClient.get<GiphyResponse>(`${this.#baseUrl}/gifs/trending`, {
      params: {
        'api_key': 'WzoRQIdtIWiwiCZsAIKJJCrzpzxmfgXu',
        'limit': 25,
      }
    }).pipe(
      map(({data}) => {
        let dataItems: Gif[] = [];
        data.map(gif => dataItems.push({id:gif.id, title: gif.title, url: gif.images.original.url}));
        return dataItems;
      }),
      catchError(err => of([]))
      )
  }

  public searchByTerm(term: string): Observable<Gif[]>{
    const searchUrl = `${this.#baseUrl}/gifs/search`;
    return this.#_httpClient.get<GiphyResponse>(searchUrl,{
      params:{
        'api_key': 'WzoRQIdtIWiwiCZsAIKJJCrzpzxmfgXu',
        'limit': 25,
        'q':`${term}`
      }
    }).pipe(
      map(({data}) => {
        let giflist: Gif[] = [];
        data.map(gif => giflist.push(
          {
            id: gif.id,
            title: gif.title,
            url: gif.images.original.url
          }
        )
      );
      this.#searchHistory.update(current => ({
        ...current,
        [term.toLocaleLowerCase()]: giflist,
      }));
      console.log({searchHistory: this.#searchHistory()});

        return giflist;
      }),
      catchError(err => of([]))
    );
  }

  public getHistoryGifs(query: string): Gif[] {
    return this.#searchHistory()[query] ?? [];
  }


}

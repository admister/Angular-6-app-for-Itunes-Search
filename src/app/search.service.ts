import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { pipe } from '@angular/core/src/render3/pipe';
import { SearchItem } from './SearchItem';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiRoot: String = 'https://itunes.apple.com/search';
  results: SearchItem[];
  loading: boolean;

  constructor(private http: HttpClient) {
    this.results = [];
    this.loading = false;
  }

  search(term: string): Observable<SearchItem[]> {
      let apiURL = `${this.apiRoot}?term=${term}&media=movie&limit=20`;
      return this.http.get(apiURL)
      .map(
        res => {
          return JSON.parse(JSON.stringify(res)).results
          .map( item => {
            console.log(item);
            return new SearchItem(
              item.trackName,
              item.artistName,
              item.trackViewUrl,
              item.artworkUrl100,
              item.artistId
            );
          });
        }
      );
  }

}

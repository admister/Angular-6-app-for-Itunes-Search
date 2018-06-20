import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { SearchItem } from './SearchItem';

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

  search(term: string) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.apiRoot}?term=${term}&media=movie&limit=20`;
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => { // Success
            this.results = JSON.parse(JSON.stringify(res)).results.map(
              item => {
                return new SearchItem(
                  item.trackName,
                  item.artistName,
                  item.trackViewUrl,
                  item.artworkUrl100.replace('30x30bb.', '227x227bb.'),
                  item.artistId
                );
              });
            console.log(JSON.stringify(this.results));
            resolve();
          },
          msg => { // Error
            reject(msg);
            }
        );
    });
    return promise;
  }

}

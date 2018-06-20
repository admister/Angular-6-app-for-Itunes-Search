import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private loading: Boolean = false;

  constructor(private itunes: SearchService, private titleService: Title) { }

  doSearch(term: string) {
    this.loading = true;
    this.itunes.search(term).then( () => this.loading = false);
    const title = `Search- ${term}`;
    this.titleService.setTitle( title );
  }
}

import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SearchService } from './search.service';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [SearchService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { KeywordsComponent } from './keywords-component/keywords.component';
import { KeywordsService } from './keywords.service'

const appRoutes: Routes = [
  { path: 'keywords/:group_id/:token', component: KeywordsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    KeywordsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [KeywordsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

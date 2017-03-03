import { NgModule, enableProdMode }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppComponent }         from './app.component';
import { DashboardComponent }   from 'brickyard/tutorial-angular2-dashboard';
import { HeroesComponent }      from 'brickyard/tutorial-angular2-heroes';
import { HeroDetailComponent }  from 'brickyard/tutorial-angular2-hero-detail';
import { HeroService, InMemoryDataService } from 'brickyard/tutorial-angular2-model';
import { HeroSearchComponent }  from 'brickyard/tutorial-angular2-hero-search';

if (process.env && process.env.NODE_ENV === 'production') {
  enableProdMode()
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'detail/:id',
        component: HeroDetailComponent
      },
      {
        path: 'heroes',
        component: HeroesComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent
  ],
  providers: [
    HeroService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

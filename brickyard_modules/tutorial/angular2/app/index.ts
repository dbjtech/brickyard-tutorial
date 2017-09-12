import { RouterModule }  from '@angular/router';
import { ngxModuleCollector } from '@brickyard/ngx-module-collector'
import { DashboardComponent } from '@brickyard/tutorial-angular2-dashboard'
import { HeroDetailComponent } from '@brickyard/tutorial-angular2-hero-detail'
import { HeroesComponent } from '@brickyard/tutorial-angular2-heroes'
import './app.component'

ngxModuleCollector.registerNgModuleImports(
  RouterModule.forRoot([
    {
      path: '',
      redirectTo: 'dashboard',
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
)

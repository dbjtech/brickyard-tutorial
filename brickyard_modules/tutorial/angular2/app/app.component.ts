import { Component }          from '@angular/core';
import { ngxModuleCollector } from '@brickyard/ngx-module-collector'

@Component({
  selector: 'brickyard-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
}

ngxModuleCollector.registerNgModuleDeclarations(AppComponent)
ngxModuleCollector.registerNgModuleBootstrap(AppComponent)

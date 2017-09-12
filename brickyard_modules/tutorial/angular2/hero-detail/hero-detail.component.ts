import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Hero, HeroService }      from 'brickyard/tutorial-angular2-model';
import { ngxModuleCollector }     from '@brickyard/ngx-module-collector';

@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.heroService.getHero(id)
        .then(hero => this.hero = hero);
    });
  }
  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
}

ngxModuleCollector.registerNgModuleDeclarations(HeroDetailComponent)

import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from "../hero.service";
import { MessageService } from "../message.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  //selectedHero: Hero;

  constructor(private heroService: HeroService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  /*
    onSelect(hero: Hero): void {
      this.selectedHero = hero;
      this.messageService.add(`HeroesComponent: sélection de ${hero.name}`);
    }
  */

  getHeroes(): void {
    //this.heroes = this.heroService.getHeroesSync();
    this.heroService.getHeroesASync()
      .subscribe(
        heroes => { this.heroes = heroes }
      );
  }

  addHero(heroName: string): void {
    var name = heroName.trim();
    if (!name) { return };
    this.heroService.addHero({ name } as Hero)
      .subscribe(
        hero => { this.heroes.push(hero) }
      );
  }

  deteleHero(hero: Hero): void {
    this.heroService.deleteHero(hero)
      .subscribe();
    this.heroes = this.heroes.filter(h => h !== hero);
  }
}

//#region - app.component.ts
/* 
This is an Angular component in TypeScript that imports two services: 
PokemonService and UserService. The AppComponent class implements the OnInit lifecycle hook, and the ngOnInit() method checks if there is a user in the UserService. 
If there is, it calls the getPokemons() method on the PokemonService. 
The title property is set to 'ng-PokemonTrainer'. 
The @Component decorator provides metadata about the component, including the selector, template, and styles.
*/
//#endregion

import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon-catalogue.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ng-PokemonTrainer';

  constructor (
    private readonly userService: UserService,
    private readonly pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
    if (this.userService.user) {
      this.pokemonService.getPokemons();
    }
  }
}

//#region 
/*
This is an Angular component that displays a list of captured Pokemon by the current user and allows the user to release them. 
It imports the necessary modules and services, defines getter methods to fetch the user and captured Pokemon, and a method to release a captured Pokemon. 
The component is initialized using a lifecycle hook.
*/
//#endregion

import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit{

  get user(): User | undefined {
    return this.userService.user;
  }

  get captureds(): Pokemon[] {
    return this.userService.getCapturedPokemon();
  }

  constructor (
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  releasePokemon(pokemon: Pokemon) {
    if (this.userService.user) {
      this.userService.removerFromCaptured(pokemon.name);
    }
  }
}

//#region 
/*
This is an Angular component called PokemonCataloguePage. 
It imports Component and OnInit from @angular/core, Pokemon model from 'src/app/models/pokemon.model', and PokemonService from 'src/app/services/pokemon-catalogue.service'. 
The component displays a list of pokemons, which are fetched from the pokemonCatalogueService instance using getters.
The ngOnInit method is called when the component is initialized, and it calls the getPokemons method of the pokemonCatalogueService to fetch the list of pokemons.
*/
//#endregion

import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.component.html',
  styleUrls: ['./pokemon-catalogue.component.css']
})
export class PokemonCataloguePage implements OnInit {

  get pokemons(): Pokemon[] {
    return this.pokemonCatalogueService.pokemons;
  }

  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  get error(): string {
    return this.pokemonCatalogueService.error;
  }

  constructor(
    private readonly pokemonCatalogueService: PokemonService
  ) { }

  ngOnInit(): void {
      this.pokemonCatalogueService.getPokemons();
    }
}
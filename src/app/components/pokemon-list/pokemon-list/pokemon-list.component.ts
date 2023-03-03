//#region 
/*
This is an Angular component that displays a list of Pokemons. 
It retrieves the list from an API using the PokemonService, and allows the user to navigate through the list using the onNextPage() and onPreviousPage() methods. 
The pageSize property determines the number of Pokemons displayed on each page. 
The component also calculates the total number of pages required to display all the Pokemons. 
The Pokemon model is used to define the type of the pokemon and pokemonsArray input properties.
*/
//#endregion

import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  currentPage = 0;
  pageSize = 10;

  @Input() pokemon?: Pokemon;
  @Input() pokemonsArray: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService,) {}
    

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((data) => {
      this.pokemons = data.results;
    });
  }

  get displayedPokemons() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.pokemons.slice(start, end);
  }

  onNextPage() {
    if (this.hasMorePages) {
      this.currentPage++;
    }
  }

  onPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  get hasMorePages() {
    return this.currentPage < this.totalPages - 1;
  }

  get totalPages() {
    return Math.ceil(this.pokemons.length / this.pageSize);
  }
 }

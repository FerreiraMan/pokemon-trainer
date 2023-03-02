import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { FavouriteService } from 'src/app/services/favourite.service';
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

  //@Input() pokemon?: Pokemon;
  @Input() pokemons1: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService,
    private favouriteService: FavouriteService) {} //lalallala
    

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

 
  onFavourite(pokemon: any) {
    const id = pokemon.url.split('/')[6];
    this.pokemonService.findPokemonById(id).subscribe((data) => {
      pokemon.id = data.id;
    });
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

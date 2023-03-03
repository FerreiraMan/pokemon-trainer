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

  public GetUrl(pokemonUrl : string){
    const urlArray = pokemonUrl.split("/");
    const id = urlArray[urlArray.length-1];
    console.log("id é este" + id);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}`;
 }
 }

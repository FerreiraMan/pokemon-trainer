import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly CACHE_KEY = 'pokemons';
  private readonly API_URL = 'https://pokeapi.co/api/v2/pokemon';

  private _pokemons: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  get pokemons(): Pokemon[] {
    return this._pokemons;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<any> {
    const cachedData = sessionStorage.getItem(this.CACHE_KEY);
    if (cachedData) {
      return of(JSON.parse(cachedData)).pipe(
        tap(data => {
          this._pokemons = data.results;
        })
      );
    }
  
    return this.http
      .get<any>(`${this.API_URL}?limit=150`)
      .pipe(
        tap(data => {
          this._pokemons = data.results;
          sessionStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
        })
      );
  }

  findPokemonById(id: number): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<any>(url);
  }

  pokemonByName(name: string): Pokemon | undefined {
    return this._pokemons.find((pokemon: Pokemon) => pokemon.name === name);
  }
}

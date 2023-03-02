import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly CACHE_KEY = 'pokemons';
  private readonly API_URL = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<any> {
    const cachedData = sessionStorage.getItem(this.CACHE_KEY);
    if (cachedData) {
      return of(JSON.parse(cachedData));
    }

    return this.http
      .get<any>(`${this.API_URL}?limit=150`)
      .pipe(tap((data) => sessionStorage.setItem(this.CACHE_KEY, JSON.stringify(data))));
  }

  findPokemonById(id: number): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<any>(url);
  }
}

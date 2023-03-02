import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { finalize, Observable, tap } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { PokemonCataloguePage } from '../pages/pokemon-catalogue/pokemon-catalogue.component';
import { PokemonService } from './pokemon-catalogue.service';
import { UserService } from './user.service';

const { apiKey, apiUsers } = environment;

@Injectable({
  providedIn: 'root'
})
export class CapturedService {

  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonService,
    private readonly userService: UserService,
  ) { }

  public addToCaptured(name: string): Observable<User> {

    if (!this.userService.user) {
      throw new Error("addToCaptured: There is no user")
    }  

    const user: User = this.userService.user;
    const pokemon: Pokemon | undefined = this.pokemonService.pokemonByName(name);
    
    console.log(name);
    console.log(pokemon);

    if(!pokemon) {
      throw new Error("addToCaptured: No pokemon with name:" + name);
    }

    if(this.userService.inCaptured(name)) {
      throw new Error("addToCaptured: Pokemon already in captured collection")
    }

    const headers = new HttpHeaders({
      'content-type' : 'application/json',
      'x-api-key' : apiKey
    })

    this._loading = true;

    return this.http.patch<User>(`${apiUsers}/${user.id}` , {
      favouritesPokemon: [...user.favouritesPokemon, pokemon]
    }, {
      headers
    })
    .pipe(
      tap((updatedUser: User) => {
        this.userService.user = updatedUser;
      }),
      finalize(() => {
        this._loading = false;
      }))
  }
}

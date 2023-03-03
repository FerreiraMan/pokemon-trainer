import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, tap } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { PokemonService } from './pokemon-catalogue.service';
import { UserService } from './user.service';

const { apiKey, apiUsers } = environment;

@Injectable({
  providedIn: 'root'
})
export class CapturedService {

  @Input() capturedPokemon: Pokemon[] = [];

  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonService,
    private readonly userService: UserService,
  ) { }

  public addToCaptured(name: string): Observable<User> {

    console.log("addToCaptured: ", name); /////////

    if (!this.userService.user) {
      throw new Error("addToCaptured: There is no user")
    }  

    const user: User = this.userService.user;
    const pokemon: Pokemon | undefined = this.pokemonService.pokemonByName(name);
    
    if(!pokemon) {
      throw new Error("addToCaptured: No pokemon with name:" + name);
    }

    if(this.userService.inCaptured(name)) {
      this.userService.removerFromCaptured(name);
    } else {
      this.userService.addToCaptured(pokemon);
    }
    
    const headers = new HttpHeaders({
      'content-type' : 'application/json',
      'x-api-key' : apiKey
    })

    return this.http.patch<User>(`${apiUsers}/${user.id}` , {
      favouritesPokemon: [...user.favouritesPokemon] //already updated
    }, {
      headers
    })
    .pipe(
      tap((updatedUser: User) => {
        this.userService.user = updatedUser;
        this.capturedPokemon = this.userService.getCapturedPokemon();
      })
    )
    }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, tap } from 'rxjs';
import { Guitar } from '../models/guitar.model';
import { User } from '../models/user.model';
import { GuitarCatalogueService } from './guitar-catalogue.service';
import { PokemonService } from './pokemon-catalogue.service';
import { UserService } from './user.service';
import { Pokemon } from '../models/pokemon.model';

const { apiKey, apiUsers } = environment;

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(
    private http: HttpClient,
    private readonly guitarService: GuitarCatalogueService,
    private readonly userService: UserService,
    private readonly pokemonService: PokemonService,
  ) { }

  // Get the guitar based on the Id

  // Path request with the userId and the guitar


  public addToFavourites(guitarId: string): Observable<User> {

    if (!this.userService.user) {
      throw new Error("addToFavourites: There is no user")
    }

    const user: User = this.userService.user;
    const guitar: Guitar | undefined = this.guitarService.guitarById(guitarId);

    if (!guitar) {
      throw new Error("addToFavourites: No guitar with id:" + guitarId);
    }

    if (this.userService.inFavourites(guitarId)) {
      this.userService.removeFromFavourites(guitarId);
    } else {
      this.userService.addToFavourites(guitar);
    }

    const headers = new HttpHeaders({
      'content-type' : 'application/json',
      'x-api-key' : apiKey
    })

    return this.http.patch<User>(`${apiUsers}/${user.id}` , {
      favourites: [...user.favourites] // already updated
    }, {
      headers
    })
    .pipe(
      tap((updatedUser: User) => {
        this.userService.user = updatedUser;
      })
    )
  }
}
//#region 
/*
The code defines an Angular service named UserService that manages user data, including captured Pokemon lists. 
The service stores the user information in the browser's local storage using a utility class called StorageUtil.
The service provides methods for adding, removing, and checking if a Pokemon is in the captured Pokemon list, and getting the list of captured Pokemon for the current user.
The @Injectable decorator is used to provide metadata that allows Angular to inject dependencies into the UserService.
*/
//#endregion

import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';
import { Pokemon } from '../models/pokemon.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user?: User;
  get user(): User | undefined {
    return this._user;
  }
  set user(user: User | undefined) {
    StorageUtil.storageSave<User>(StorageKeys.User, user!);
    this._user = user;
  }
  constructor() {
    this._user =  StorageUtil.storageRead<User>(StorageKeys.User);
  }
  public logout(): void {
    StorageUtil.storageSave(StorageKeys.User, undefined);
    this._user = undefined;
  }

  public inCaptured(pokemonName: string) : boolean {
    //console.log("inCaptured: ", pokemonName); // add this line
    if (this._user) {
      //console.log("this.user: ", this.user); // add this line
      return Boolean(
        this.user?.favouritesPokemon.find(
          (pokemon: Pokemon) => pokemon.name === pokemonName));
    }
    return false;
  }

  public addToCaptured(pokemon: Pokemon): void {
    if (this._user) {
      this._user.favouritesPokemon.push(pokemon);
    }
  }

  public removerFromCaptured(pokemonName: string): void {
    if (this._user){
      this._user.favouritesPokemon = this._user.favouritesPokemon.filter((pokemon: Pokemon) => pokemon.name !== pokemonName);
  }
}

public getCapturedPokemon(): Pokemon[] {
  if (this._user) {
    return this._user.favouritesPokemon;
  }
  return [];
}
}


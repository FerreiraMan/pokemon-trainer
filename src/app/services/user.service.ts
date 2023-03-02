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

  /////////////////////////////////////////////////
  public inCaptured(pokemonName: string) : boolean {
    if (this._user) {
      return Boolean(this.user?.favouritesPokemon.find((pokemon: Pokemon) => pokemon.name === pokemonName))
    }
    return false;
  }
}



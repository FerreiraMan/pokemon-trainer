import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit{

  get user(): User | undefined {
    return this.userService.user;
  }

  get captureds(): Pokemon[] {
    if (this.userService.user) {
      return this.userService.user.favouritesPokemon;
    }
    return [];
  }

  get captureds1(): Pokemon[] {
    return this.userService.getCapturedPokemon();
  }

  constructor (
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

}

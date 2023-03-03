import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon-catalogue.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ng-PokemonTrainer';

  constructor (
    private readonly userService: UserService,
    private readonly pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
    if (this.userService.user) {
      this.pokemonService.getPokemons();
    }
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FavouriteService } from 'src/app/services/favourite.service';
import { UserService } from 'src/app/services/user.service';
import { PokemonService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.css']
})
export class FavouriteButtonComponent implements OnInit{

  public loading: boolean = false;
  public isFavourite: boolean = false;

  @Input() guitarId: string = "";
  @Input() pokemon: any; // pass the pokemon object as input

  constructor(
    private readonly userService: UserService,
    private readonly favouriteService: FavouriteService,
    private readonly pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
    // Inputs are resolved
    this.isFavourite = this.userService.inFavourites(this.pokemon.id);
  }

  onFavouriteClick(): void {
    this.loading = true;
  
    this.pokemonService.findPokemonById(this.pokemon.url.split('/')[6]).subscribe((data) => {
      alert(`Pokemon ID: ${data.id}` + " Name: " + `${data.name}`);
  
      // Add the pokemon to the favourites
      this.favouriteService.addToFavourites(data.id).subscribe({
        next: (user: User) => {
          this.loading = false;
          this.isFavourite = this.userService.inFavourites(this.pokemon.id);
        },
        error: (error: HttpErrorResponse) => {
          console.log("ERROR", error.message)
        }
      })
    });
  }  
}

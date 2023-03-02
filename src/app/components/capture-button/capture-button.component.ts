import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { CapturedService } from 'src/app/services/captured.service';
import { PokemonService } from 'src/app/services/pokemon-catalogue.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-capture-button',
  templateUrl: './capture-button.component.html',
  styleUrls: ['./capture-button.component.css']
})
export class CaptureButtonComponent implements OnInit{

  @Input() pokemon: any; // pass the pokemon object as input
  @Input() pokemonName: string = "";

  get loading(): boolean {
    return this.capturedService.loading;
  }  

  constructor(
    private readonly userService: UserService,
    private readonly pokemonService: PokemonService,
    private readonly capturedService: CapturedService,
  ) { }

  ngOnInit(): void {
  }

  onCaptureClick(): void {
    // add pokemons to captured
    //alert("clicked a captured: " + this.pokemonName);
    this.capturedService.addToCaptured(this.pokemonName)
      .subscribe({
        next: (response: User) => {
          console.log("NEXT", response)
        },
        error: (error: HttpErrorResponse) => {
          console.log("Error", error.message)
        }
      })
  }
}  

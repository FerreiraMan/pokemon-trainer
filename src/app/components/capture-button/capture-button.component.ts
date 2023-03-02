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

  public loading: boolean = false;
  public isCaptured: boolean = false;

  @Input() pokemon: any; // pass the pokemon object as input
  @Input() pokemonName: string = "";

  constructor(
    private readonly userService: UserService,
    private readonly pokemonService: PokemonService,
    private readonly capturedService: CapturedService,
  ) { }

  ngOnInit(): void {
    this.isCaptured = this.userService.inCaptured(this.pokemonName);
  }

  onCaptureClick(): void {
    this.loading = true;
    this.capturedService.addToCaptured(this.pokemonName)
      .subscribe({
        next: (response: User) => {
          this.loading = false;
          this.isCaptured = this.userService.inCaptured(this.pokemonName);
        },
        error: (error: HttpErrorResponse) => {
          console.log("Error", error.message)
        }
      })
  }
}  

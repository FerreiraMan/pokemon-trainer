//#region 
/*
This code creates a button that lets a user capture a Pokemon. 
When the button is clicked, the component sends a request to add the Pokemon to the user's captured list using a service called CapturedService. 
If the request is successful, the component updates to show that the Pokemon has been captured. 
The pokemon and pokemonName variables can be passed in from a parent component. 
The loading variable shows if data is being loaded, and the isCaptured variable shows if the Pokemon has been captured. 
The ngOnInit() function checks if the current Pokemon is captured. 
The onCaptureClick() function adds the Pokemon to the captured list and updates the loading and isCaptured variables.
*/
//#endregion

import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { CapturedService } from 'src/app/services/captured.service';
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
          //console.log("NEXT", response )
        },
        error: (error: HttpErrorResponse) => {
          //console.log("Error", error.message)
        }
      })
  }
}  

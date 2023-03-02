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
          console.log("NEXT", response )
        },
        error: (error: HttpErrorResponse) => {
          console.log("Error", error.message)
        }
      })
  }
}  

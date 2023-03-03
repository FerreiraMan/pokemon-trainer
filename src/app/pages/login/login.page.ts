//#region 
/*
This code is an Angular component for a login page that uses the Router class to navigate to a different page once the user is authenticated. 
The handleLogin() method is called when the user clicks on the login button and it navigates to the "/pokemons" URL.
*/
//#endregion

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage {

  constructor(private readonly router: Router) { }

  handleLogin(): void {
    this.router.navigateByUrl("/pokemons");
  }
}

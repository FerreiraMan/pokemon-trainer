//#region 
/*
This is an Angular component for a navigation bar that has a User object retrieved from a UserService using a getter. 
It also has a logout() method that calls the logout() method from the UserService and navigates to the /login page using the Router. 
The component is defined using the @Component decorator and injected with dependencies using the constructor method.
*/
//#endregion

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service'; 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  get user(): User | undefined {
    return this.userService.user;
  }
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}
  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }
}

//#region 
/*
This is a TypeScript file for an Angular component called LoginFormComponent that handles user interactions for a login form in an Angular application.

It imports dependencies such as Component, EventEmitter, Output, Renderer2, NgForm, User, LoginService, and UserService.

It defines the metadata for the component using the @Component decorator, including the HTML tag name, the HTML template, and CSS styles.

The component has a property called login which emits an event when the user logs in, and it tracks whether the user has clicked the login button.

The loginSubmit method is called when the user submits the login form. It extracts the username from the form and passes it to the loginService to perform a login action. If the login is successful, the logged-in user's information is saved, and the login event is emitted.

The setBackgroundImage method sets the background image of the document body.

The ngOnInit lifecycle hook calls the setBackgroundImage method.
*/
//#endregion

import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  @Output() login: EventEmitter<void> = new EventEmitter();
  isClicked = false;
  // Dependecy injection
  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService,
    private renderer: Renderer2
  ) {}
  public loginSubmit(loginForm: NgForm): void {
    //  USERNAME
    const { username } = loginForm.value;
    this.loginService.login(username).subscribe({
      next: (user: User) => {
        // redirect to catalogue page.
        this.userService.user = user;
        this.login.emit();
      },
      error: () => {
        // Handle that locally
      },
    });
  }
  public setBackgroundImage() {
    //const imageUrl = 'url("https://wallpaperaccess.com/full/798721.gif")';
    const imageUrl = "https://i.pinimg.com/originals/b8/83/fc/b883fc84b57235e6fe57f409716ae68d.gif"
    this.renderer.setStyle(document.body, 'background-image', imageUrl);
  }
  ngOnInit(): void {
    this.setBackgroundImage();
  }
}

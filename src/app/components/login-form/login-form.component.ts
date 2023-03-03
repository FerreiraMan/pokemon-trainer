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

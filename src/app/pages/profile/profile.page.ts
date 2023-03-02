import { Component } from '@angular/core';
import { Guitar } from 'src/app/models/guitar.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css']
})
export class ProfilePage {

  get user(): User | undefined {
    return this.userService.user;
  }

  constructor(
    private userService: UserService
  ) { }
  

}

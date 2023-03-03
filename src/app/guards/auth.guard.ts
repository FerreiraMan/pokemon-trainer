//#region 
/*
The code is an Angular service that protects routes from unauthorized access. 
It implements the CanActivate interface, which requires it to provide an implementation for the canActivate method.
The canActivate method checks whether there is a user object in the UserService service.
If there is, the method returns true, allowing the user to access the requested route. 
Otherwise, it saves the current URL to session storage and redirects the user to the login page. 
The service is marked as injectable with the @Injectable decorator and registered with the root injector using the providedIn: 'root' option.
*/
//#endregion

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { StorageUtil } from '../utils/storage.util';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.user) {
      return true;
    }
    else {
      // Save the current URL to session storage
      StorageUtil.storageSave<string>('redirectUrl', state.url);
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}


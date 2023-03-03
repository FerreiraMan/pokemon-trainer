//#region 
/*
The code defines an Angular service called LoginService which handles user authentication. The service checks if a user exists in the system or creates a new user if they do not exist.

It uses the HttpClient service to make HTTP requests to an API and the rxjs library for operators to manipulate observable streams.

The login() method checks if a user exists and returns the user object if they do, or creates a new user and returns the newly created user object.

The checkUsername() method makes an HTTP GET request to the API to check if a user with the given username exists.

The createUser() method creates a new user and makes an HTTP POST request to the API to save the user.

The environment variables hold the API endpoint and API key used in the requests.

The service is decorated with @Injectable and provided as a singleton for the entire application.
*/
//#endregion

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'environments/environment';
import { User } from '../models/user.model';
const { apiUsers } = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Dependecy injection
  constructor(private readonly http: HttpClient) { }
  //  Models, Observables and RxJS operators.
  public login(username : string): Observable<User> {
    return this.checkUsername(username)
      .pipe(
        switchMap((user: User | undefined) => {
          if (user === undefined) { //user does not exist
            return this.createUser(username)
          }
          return of(user);
        })
      )
  }
  //  Login
  private checkUsername(username: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${apiUsers}?username=${username}`)
      .pipe(
        // rsjx operatos
        map((response: User[]) => response.pop())
      )
  }
  private createUser(username: string): Observable<User> {
    //user
    const user = {
      username,
      favouritesPokemon: []
    };
    //headers -> API Key
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "x-api-key": environment.apiKey
    });
    return this.http.post<User>(apiUsers, user, {
      headers
    })
  }
}






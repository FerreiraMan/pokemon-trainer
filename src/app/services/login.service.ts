import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'environments/environment';
import { User } from '../models/user.model';
const { apiUsers, apiKey } = environment;
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
      "x-api-key": apiKey
    });
    return this.http.post<User>(apiUsers, user, {
      headers
    })
  }
}






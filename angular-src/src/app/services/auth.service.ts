import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  // Register user.
  registerUser(user) {

    // Set the content-type of the headers.
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // return the observable.
    return this.http.post('http://localhost:3000/users/register', user, { headers:headers })
      .map(res => res.json());
  }

  // Log user in.
  authenticateUser(user) {

    // Set the content-type of the headers.
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // Return the observable.
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers:headers })
      .map(res => res.json());
  }

  // Store user data in local storage.
  storeUserData(token, user) {
    // set items in local storage.
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    // set component properties.
    this.authToken = token;
    this.user = user;
  }

  // Logout user.
  logOut() {
    // clear local storage.
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {

    // Set the content-type of the headers.
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // return the observable.
    return this.http.post('users/register', user, { headers:headers })
      .map(res => res.json());
  }

  authenticateUser(user) {

    // Set the content-type of the headers.
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // return the observable.
    return this.http.post('users/authenticate', user, { headers:headers })
      .map(res => res.json());
  }

  storeUserData(token, user) {

    // Store in local storage.
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    // Set the component
    this.authToken = token;
    this.user = user;
  }

  loadToken() {

    // get the token.
    const token = localStorage.getItem('id_token');

    // set the authToken component property.
    this.authToken = token;
  }

  getProfile() {

    // Set the content-type of the headers.
    let headers = new Headers();

    // get the authorization token.
    this.loadToken();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);

    // return the observable.
    return this.http.get('users/profile', { headers:headers })
      .map(res => res.json());
  }

  loggedIn() {

    return tokenNotExpired('id_token');
  }

  logout() {

    // clear component properties.
    this.authToken = null;
    this.user = null;

    // clear localStorage.
    localStorage.clear();
  }

}

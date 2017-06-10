import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

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
    return this.http.post('http://localhost:3000/users/register', user, { headers:headers })
      .map(res => res.json());
  }

  authenticateUser(user) {

    // Set the content-type of the headers.
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // return the observable.
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers:headers })
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

}

import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  // Validate user registration form.
  validateRegister(newUser) {
    // Check if fields are empty.
    if(newUser.name == undefined || newUser.username == undefined || newUser.email == undefined || newUser.password == undefined) {
      return false;
    } else {
      return true;
    }
  }

  // Validate email address.
  validateEmail(email) {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(email);
  }

  // Validate login form.
  validateLogin(user) {
    if(user.username == undefined || user.password == undefined) {
      return false;
    } else {
      return true;
    }
  }

}

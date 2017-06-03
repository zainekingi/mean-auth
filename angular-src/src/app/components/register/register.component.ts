import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService, private flashMessages: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegister() {
    // create new user object.
    const newUser = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // Required fields.
    if(!this.validateService.validateRegister(newUser)) {
      // display error.
      this.flashMessages.show('Please fill in all fields!', { cssClass: 'alert-danger', timeout: 5000 });

      // return false.
      return false;
    }

    // Validate email.
    if(!this.validateService.validateEmail(newUser.email)) {
      // display error.
      this.flashMessages.show('Please use a valid email!', { cssClass: 'alert-danger', timeout: 5000 });

      // return false.
      return false;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

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

  constructor(
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegister() {
    // create new user object.
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // Required fields.
    if(!this.validateService.validateRegister(user)) {
      // display error.
      this.flashMessages.show('Please fill in all fields!', { cssClass: 'alert-danger', timeout: 5000 });

      // return false.
      return false;
    }

    // Validate email.
    if(!this.validateService.validateEmail(user.email)) {
      // display error.
      this.flashMessages.show('Please use a valid email!', { cssClass: 'alert-danger', timeout: 5000 });

      // return false.
      return false;
    }

    // Register user.
    this.authService.registerUser(user).subscribe(data => {
      // test for success.
      if(data.success) {
        // everything is good - register user.
        this.flashMessages.show('You are now registered and can log in!', { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/login']);
      } else {
        // registration failed.
        this.flashMessages.show('Something went wrong?', { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['/register']);
      }
    });

  }

}

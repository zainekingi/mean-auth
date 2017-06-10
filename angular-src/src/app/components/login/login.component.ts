import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Inject component properties.
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin() {

    // Create the user object.
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {

      // Test for success.
      if(data.success) {

        // store the data in local storage.
        this.authService.storeUserData(data.token, data.user);

        // Display success message.
        this.flashMessages.show('You are now logged in!', { cssClass: 'alert-success', timeout: 5000 });

        // route back to the dashboard.
        this.router.navigate(['dashboard']);

      } else {

        // Display error.
        this.flashMessages.show(data.message, { cssClass: 'alert-danger', timeout: 5000 });

        // route back to the login page.
        this.router.navigate(['login']);
      }
    });
  }

}

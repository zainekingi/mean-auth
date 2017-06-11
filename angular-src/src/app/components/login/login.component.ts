import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Login component properties.
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  // onLogin function.
  onLogin() {
    const user = {
      username: this.username,
      password: this.password
    };

    // Authenticate user.
    this.authService.authenticateUser(user).subscribe(data => {
      // Check if authentication is successful.
      if(data.success) {
        // Everything is good - store user data, alert and log user in.
        this.authService.storeUserData(data.token, data.user);

        this.flashMessages.show('Login success!', { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/dashboard']);
      } else {
        // Error occurred - alert message.
        this.flashMessages.show('Username and/or password are wrong!', { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['/login']);
      }
    });
  }
}

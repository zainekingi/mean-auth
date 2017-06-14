import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // component properties.
  user: Object;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {

    // get user profile from local storage.
    this.authService.getProfile().subscribe(profile => {
      // set the user.
      this.user = profile.user;
    },
    // throw error - no user returned.
    err => {
      console.log(err);
      return false;
    });
  }

}

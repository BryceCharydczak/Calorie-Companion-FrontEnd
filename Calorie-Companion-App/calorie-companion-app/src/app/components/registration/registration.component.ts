import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';

import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  user: User = new User();
  loggedUser = localStorage.getItem('user');
  isValid: Boolean = true;

    constructor(
      private userService: UserService,
      private router: Router
    ) { }

    // Init method
    ngOnInit() {
    }


  // Registration method
  register() {
    this.userService.register(this.user).subscribe(users => {
      if (users == null) {
        this.isValid = !this.isValid;
      } else {
        this.userService.subscribers.next(users);
        this.userService.loggedIn.next(true);
        localStorage.setItem('user', JSON.stringify(users));
        console.log(`User, ${this.user.email}, successfully registered!`);
        console.log(localStorage.getItem('user'));
        this.router.navigate(['landing']);
      }
    });
  }

}

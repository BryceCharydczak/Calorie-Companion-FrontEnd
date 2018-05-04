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
  isUser: Boolean = true;

  // ***************** Start of Calendar API ****************** //
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };

  // Initialized to specific date (09.10.2018) Calendar API
  model: any = { date: { year: 2018, month: 10, day: 9 } };

   // optional date changed callback Calendar API
   onDateChanged(event: IMyDateModel): void {
  }

  // Toggles the calendar event handler
  onCalendarToggle(event: number): void {
    console.log('onCalendarClosed(): Reason: ', event);
  }

  // ***************** End of Calendar API ****************** //

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
        this.isUser = !this.isUser;
      } else {
        this.userService.subscribers.next(users);
        this.userService.loggedIn.next(true);
        localStorage.setItem('user', JSON.stringify(users));
        console.log(`User, ${this.user.email}, successfully registered!`);
        console.log(localStorage.getItem('user'));
        this.router.navigate(['login']);
      }
    });
  }

}

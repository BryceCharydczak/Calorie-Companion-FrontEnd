// Modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loggedIn: boolean = (localStorage.getItem('user') !== null) ? true : false;
  user: User = new User();

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.userService.getLoggedIn().subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
   }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.userService.loggedIn.next(false);
    this.router.navigate(['login']);
  }

}

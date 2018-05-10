import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  // addMeals() {
  //   this.router.navigate(['addmeals']);
  // }

  foodSearch() {
    this.router.navigate(['foodsearch']);
  }

  // summary() {
  //   this.router.navigate(['summary']);
  // }

  graphs() {
    this.router.navigate(['graphs']);
  }

}

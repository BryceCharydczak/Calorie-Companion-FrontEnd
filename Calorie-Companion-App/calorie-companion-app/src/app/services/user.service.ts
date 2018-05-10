// Modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject } from 'rxjs';

// Model
import { User } from '../models/User';

// Components
import { NavComponent } from '../components/nav/nav.component';

// Set up the API URL to communicate with Back end
// and Nutritionix API.
const API_URL = environment.apiUrl;
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class UserService {

  // Subscribe to the User Object
  subscribers: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>((localStorage.getItem('user') !== null) ? true : false);


  // Instantiate a new User
  user: User = new User();

  // Constructor
  constructor(private http: HttpClient) {
    const usr = localStorage.getItem('user');
    if (usr !== '{ }' && usr !== 'undefined') {
       this.subscribers.next(JSON.parse(usr));
    }
   }

   // Login User method when the user click the login button
   public loginUser(user: User) {
    console.log(`Attempting to login user: ${user.email}`);
    const json = JSON.stringify(user);

    return this.http.post<User>(API_URL + 'users/login', json, HTTP_OPTIONS);
  }

  // Register the User when the user clicks the register on the Registration Component
  public register(user: User) {
    console.log(`Attempting to make a new user: ${user.email}`);
    const json = JSON.stringify(user);

    return this.http.post<User>(API_URL + 'users', json, HTTP_OPTIONS); // (API_URL + 'registration' , json, HTTP_OPTIONS)
  }

  // To verify if the User is logged in or not
  public getLoggedIn() {
    console.log(this.loggedIn);
    return this.loggedIn;
  }

}


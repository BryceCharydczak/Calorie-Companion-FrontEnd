import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment.prod';
import { FoodBank } from '../models/FoodBank';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';


// Constants
const API_URL1 = 'http://localhost:4200/chart-app/';
const HTTP_OPTIONS = ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-app-id': 'ec580b4d',
    'x-app-key': '31b3fef2b41294a03d8a69572c55b6f7'
  })
});

const API_URL = 'http://ccomp-env.frwspvq277.us-east-2.elasticbeanstalk.com/';
const HTTP_OPTIONS2 = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable()
export class FoodInfoService {

  // Observables
  subscribers: BehaviorSubject<FoodBank> = new BehaviorSubject<FoodBank>(null);
  allfoods: BehaviorSubject<Array<FoodBank>> = new BehaviorSubject<Array<FoodBank>>(null);

  // variables and Arrays
  foodBank: FoodBank = new FoodBank();
  foods: Array<FoodBank> = new Array<FoodBank>();

  // Search button to get food array
  getFoodInfo(foodDesc: string) {
    return this.http.post('https://trackapi.nutritionix.com/v2/natural/nutrients',
      {'query': foodDesc}, HTTP_OPTIONS).map(result => result);
  }

  // Sends food to the back-end for persistence
  sendFoods (nk: string) {
    console.log(`Attempting to submit foods`);
    console.log('send foods DONE');
    return this.http.post<FoodBank>(API_URL + 'foods', nk, HTTP_OPTIONS2);
  }

  constructor(private http: HttpClient) { }

}

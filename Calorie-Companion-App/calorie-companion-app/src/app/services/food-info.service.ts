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
    'x-app-id': '3ac2b31c',
    'x-app-key': 'aad6cdf3b518e9518f6d9f21b7ee1987'
  })
});

@Injectable()
export class FoodInfoService {

  subscribers: BehaviorSubject<FoodBank> = new BehaviorSubject<FoodBank>(null);
  allfoods: BehaviorSubject<Array<FoodBank>> = new BehaviorSubject<Array<FoodBank>>(null);
  foodBank: FoodBank = new FoodBank();
  foods: Array<FoodBank> = new Array<FoodBank>();

  getFoodInfo(foodDesc: string) {

    return this.http.post('https://trackapi.nutritionix.com/v2/natural/nutrients',
      {'query': foodDesc}, HTTP_OPTIONS).map(result => result);
  }

  sendFoods () {

    

  }

  constructor(private http: HttpClient) { }

}

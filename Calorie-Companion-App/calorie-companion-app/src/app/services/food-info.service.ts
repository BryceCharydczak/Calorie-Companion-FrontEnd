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
    'x-app-id': '127ec186',
    'x-app-key': '5de4c87c9c140ebb37b0e8b2decd4478'
  })
});
const HTTP_OPTIONS2 = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const API_URL = 'http://ccomp-env.frwspvq277.us-east-2.elasticbeanstalk.com/';

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

  sendFoods (foodBank: FoodBank) {
    const json = JSON.stringify(foodBank);
    console.log('Send Foods', json);
    return this.http.post<FoodBank>(API_URL + 'foods', json, HTTP_OPTIONS2);

  }

  constructor(private http: HttpClient) { }

}

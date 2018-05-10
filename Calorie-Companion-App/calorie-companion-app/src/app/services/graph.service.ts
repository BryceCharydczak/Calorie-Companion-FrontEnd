import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FoodBank } from '../models/FoodBank';

const API_URL = 'http://ccomp-env.frwspvq277.us-east-2.elasticbeanstalk.com/foods/user/';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class GraphService {

  currentUserFoods;

  getUserFoodHistory(id) {
    return this.http.get<FoodBank[]>(API_URL + id, HTTP_OPTIONS);
  }

  constructor(private http: HttpClient) { }

}

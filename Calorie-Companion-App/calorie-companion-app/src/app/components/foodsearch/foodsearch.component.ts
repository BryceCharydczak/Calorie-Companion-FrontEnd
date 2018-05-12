import { Component, OnInit } from '@angular/core';
import { FoodInfoService } from '../../services/food-info.service';

import { UserService } from '../../services/user.service';

import { Router } from '@angular/router';
import { FoodBank } from '../../models/FoodBank';

import { User } from '../../models/User';

@Component({
  selector: 'app-foodsearch',
  templateUrl: './foodsearch.component.html',
  styleUrls: ['./foodsearch.component.css']
})
export class FoodsearchComponent implements OnInit {

  searchItem = '';
  currentFood = null;
  savedFoods = Array();

  loggedUser = localStorage.getItem('user');
  userParsed = JSON.parse(localStorage.getItem('user'));
  key = Object.values(this.userParsed);
  foodBank: FoodBank = new FoodBank();
  somefoods: Array<FoodBank> = new Array<FoodBank>();
  isValid = true;
  id = this.key[0];

  // The user can search any type of food by typing on the search bar and
  // the query will hit the API endpoint and return a food.
  getFood() {
    this.foodInfoService.getFoodInfo(this.searchItem).subscribe( res => {

      this.currentFood = res;
      if (this.currentFood.foods[0].nf_sugars == null) {
      this.currentFood.foods[0].nf_sugars = 0;
      }
    console.log(this.currentFood);
  });
  }

  // After searching a food, the user can add that food to the list of foods
  // the user wants to add for the array.
  addFood() {
    this.foodInfoService.getFoodInfo(this.searchItem).subscribe(res => {

      this.savedFoods.push(res);
      
      localStorage.setItem('foodbank', JSON.stringify(this.savedFoods));
      console.log('-------------------', this.savedFoods);      
    });
  }

  // Removes individual row by pressing the remove button on that
  // particular food the user wants to remove.
  removeFood(index) {
      this.savedFoods.splice(index, 1);
      console.log('This are saved foods ', this.savedFoods);
  }

  // Removes all added foods from the table
  reset() {
    this.savedFoods = [];
    console.log('Table Reseted');
  }

  submitFood() {
    for(let i = 0; i < this.savedFoods.length; i++){
    let userId = +this.id; 
    let now: Date = new Date();
    let f = new FoodBank();

    f.userId = userId;
    f.time = now;
    f.name = this.savedFoods[i].foods[0].food_name;
    f.calories = this.savedFoods[i].foods[0].nf_calories;
    f.carbs = this.savedFoods[i].foods[0].nf_total_carbohydrate;
    f.fats = this.savedFoods[i].foods[0].nf_total_fat;
    f.protein = this.savedFoods[i].foods[0].nf_protein;
    
    this.somefoods.push(f);

    let k = JSON.stringify(this.somefoods);
    console.log('strigify k', k);
    
    }    

    let nk = JSON.stringify(this.somefoods);
    this.foodInfoService.sendFoods(nk).subscribe(res => {
        console.log('foods submitted');
        this.router.navigate(['dashboard']);
    });
  }

  constructor(
    private foodInfoService: FoodInfoService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.loggedUser != null) {
      this.userService.subscribers.next(JSON.parse(localStorage.getItem('user')));
    }
  }

}

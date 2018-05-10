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
      // console.log('This are saved foods ', this.savedFoods);
      localStorage.setItem('foodbank', JSON.stringify(this.savedFoods));
      console.log('-------------------', this.savedFoods);
      // console.log('After Res is stringify: ' , localStorage.getItem('foodbank'));
    });
  }

  // Removes individual row by pressing the remove button on that
  // particular food the user wants to remove.
  removeFood() {
      this.savedFoods.slice();
      console.log('This are saved foods ', this.savedFoods);
  }

  reset() {

  }

  submitFood() {

    for(let i = 0; i < this.savedFoods.length; i++){
    let userId = +this.id; 
    let now: Date = new Date();
    this.foodBank.userId = userId;
    this.foodBank.time = now;
    this.foodBank.name = this.savedFoods[i].foods[0].food_name;
    this.foodBank.calories = this.savedFoods[i].foods[0].nf_calories;
    this.foodBank.carbs = this.savedFoods[i].foods[0].nf_total_carbohydrate;
    this.foodBank.fats = this.savedFoods[i].foods[0].nf_total_fat;
    this.foodBank.protein = this.savedFoods[i].foods[0].nf_protein;
    
    this.somefoods.push(this.foodBank);
  
    // console.log('-----foodbank-----', this.foodBank);
    
    // let k = JSON.stringify(this.somefoods[i]);
    let k = JSON.stringify(this.somefoods);
    console.log('strigify k', k);
    
    }
    
    
    
    // localStorage.setItem('foods', JSON.stringify(this.foodBank));
    // console.log('strigify somefoods', localStorage.getItem('foods'));
    // this.foodInfoService.sendFoods(this.foodBank).subscribe(res => {
    //  this.foodBank = res;
    //   localStorage.setItem('foods', JSON.stringify(res));
    //   console.log('Foods Sent ----------' , res);
    // });
    
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

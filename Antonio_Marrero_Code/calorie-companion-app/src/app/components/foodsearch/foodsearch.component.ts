import { Component, OnInit } from '@angular/core';
import { FoodInfoService } from '../../services/food-info.service';


import { Router } from '@angular/router';
import { FoodBank } from '../../models/FoodBank';

@Component({
  selector: 'app-foodsearch',
  templateUrl: './foodsearch.component.html',
  styleUrls: ['./foodsearch.component.css']
})
export class FoodsearchComponent implements OnInit {

  searchItem = '';
  currentFood = null;
  savedFoods = Array();

  foodBank: FoodBank = new FoodBank();
  foods: Array<FoodBank> = new Array<FoodBank>();

  getFood() {
    this.foodInfoService.getFoodInfo(this.searchItem).subscribe( res => {

      this.currentFood = res;
      if (this.currentFood.foods[0].nf_sugars == null) {
      this.currentFood.foods[0].nf_sugars = 0;
      }
    console.log(this.currentFood);

  });
  }

  addFood() {
    this.foodInfoService.getFoodInfo(this.searchItem).subscribe(res => {
      this.savedFoods.push(res);
      console.log('This are saved foods ', this.currentFood);
    });
  }


  constructor(
    private foodInfoService: FoodInfoService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { FoodInfoService } from '../../services/food-info.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-foodsearch',
  templateUrl: './foodsearch.component.html',
  styleUrls: ['./foodsearch.component.css']
})
export class FoodsearchComponent implements OnInit {

  searchItem = '';
  currentFood = null;

  getFood() {
    this.foodInfoService.getFoodInfo(this.searchItem).subscribe( res => {
      this.currentFood = res;
    console.log(this.currentFood);

  });
  }


  constructor(
    private foodInfoService: FoodInfoService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}

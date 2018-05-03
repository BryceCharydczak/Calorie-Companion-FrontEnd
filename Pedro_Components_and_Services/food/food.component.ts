import { Component, OnInit } from '@angular/core';
import { FoodInfoService } from '../food-info.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  searchItem = '';
  currentFood = null;

  getFood() {
    this.foodInfoService.getFoodInfo(this.searchItem).subscribe(
      res => {this.currentFood = res;
        console.log(this.currentFood); }
    );
  }

  constructor(private foodInfoService: FoodInfoService) { }

  ngOnInit() {
  }
}

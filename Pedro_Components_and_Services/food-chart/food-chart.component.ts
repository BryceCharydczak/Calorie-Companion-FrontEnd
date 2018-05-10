import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-food-chart',
  templateUrl: './food-chart.component.html',
  styleUrls: ['./food-chart.component.css']
})
export class FoodChartComponent implements OnInit {

  chart = [];
  calories = [1.1, 2.2, 3.3, 2.2, 4.4, 5.5, 6.6, 7.7];
  fat = [2.2, 3.3, 2.3, 3.4, 4.4, 4.8, 5.5, 6.6];
  protein = [1.9, 2.8, 4.4, 5.0, 2.0, 3.2, 5.6, 6.2];
  dietData = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  constructor() { }

  ngOnInit() {

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.dietData,
        datasets: [{
          label: 'Calories',
          data: this.calories,
        }, {
          label: 'Fat',
          data: this.fat,
        }, {
          label: 'Protein',
          data: this.protein,
        }]
      }
    });
  }

}

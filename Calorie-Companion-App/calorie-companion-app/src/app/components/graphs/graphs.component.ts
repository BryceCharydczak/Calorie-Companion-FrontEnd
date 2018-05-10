
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GraphService } from '../../services/graph.service';
import { Chart } from 'chart.js';
import { FoodBank } from '../../models/FoodBank';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  /* ~ Format of the data to be returned with a call ~
  this.id = id; // long
  this.userId = userId; // string
  this.name = name; // string
  this.calories = calories;
  this.protein = protein;
  this.fats = fats;
  this.carbs = carbs;
  this.time = time;
  */
  /* holds all user data */
  userData: FoodBank[] = new Array();
  /* holds user data aggretated by day */
  sortedData: FoodBank[] = new Array();
  // dateMessage
  dateMessage = 'Enter the start and end dates';
  // chart array to hold our graphs
  chart = [];
  // arrays of individual values for use with chart array
  calories = [];
  protein = [];
  fats = [];
  carbs = [];
  times = [];


  /* grabs the current date button entries and will eventually
    update the graph in order to reflect the new date range */
  getData(from, to) {

    if (from === '') {
      this.dateMessage = '\tFrom date must be set';
      return;
    }
    if (to === '') {
      this.dateMessage = '\tTo date must be set';
      return;
    }
    const fromDate = new Date(from);
    const toDate = new Date(to);
    if (fromDate.valueOf() > toDate.valueOf()) {
      this.dateMessage = '\tFrom date must be earlier than To date!';
      return;
    }
    console.log('Dates validated');
    console.log(this.userData);

  }

  /* uses all use data to create an accumulation of nutrients on a per day basis */
  getDailyData(foods: FoodBank[]) {

    const dailyFoods = new Array();
    let currentDate = foods[0].time;
    let caloriesVal = foods[0].calories;
    let proteinVal = foods[0].protein;
    let fatsVal = foods[0].fats;
    let carbsVal = foods[0].carbs;
    for (let i = 1; i < foods.length; i++) {
      if (new Date(foods[i].time).getDay() === new Date(currentDate).getDay()) {
        caloriesVal += foods[i].calories;
        proteinVal += foods[i].protein;
        fatsVal += foods[i].fats;
        carbsVal += foods[i].carbs;



      } else {

        dailyFoods.push({
          calories: caloriesVal,
          protein: proteinVal,
          fats: fatsVal,
          carbs: carbsVal,
          time: currentDate
        });

        currentDate = foods[i].time;
        caloriesVal = foods[i].calories;
        proteinVal = foods[i].protein;
        fatsVal = foods[i].fats;
        carbsVal = foods[i].carbs;
      }
    }
    console.log(dailyFoods);
    return dailyFoods;
  }

  constructor(private graphService: GraphService) { }

  ngOnInit() {
    // must be changed when we implement user data requests
    this.graphService.getUserFoodHistory(65).subscribe(foods => {
      this.userData = foods;
      // sort data into individual days
      this.sortedData = this.getDailyData(this.userData); // this.getDailyData(this.userData);

      console.log('foods: ' + foods);
      console.log('user: ' + this.sortedData);
      console.log('sort: ' + this.sortedData);

      for (let i = 0; i < this.sortedData.length; i++) {
        this.calories.push(this.sortedData[i].calories);
        this.protein.push(this.sortedData[i].protein);
        this.fats.push(this.sortedData[i].fats);
        this.carbs.push(this.sortedData[i].carbs);
        this.times.push(this.sortedData[i].time);
      }
      // all user food populated


      Chart.defaults.global.defaultFontSize = 18;
      Chart.defaults.global.defaultFontColor = '#ff8500';
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.times,
          datasets: [{
            label: 'Calories',
            data: this.calories,
            backgroundColor: 'rgba(255, 80, 0, 0.5)'
          }, {
            label: 'Protein',
            data: this.protein,
            backgroundColor: 'rgba(0, 80, 255 0.5)'
          }, {
            label: 'Fat',
            data: this.fats,
            backgroundColor: 'rgba(255, 255, 0, 0.5)'
          }, {
            label: 'Carbohydrates',
            data: this.carbs,
            backgroundColor: 'rgba(255, 180, 0, 0.5)'
          }]
        },
        options: {
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                minUnit: 'hour'
              },
              distribution: 'linear'
            }]
          }
        }
      });


    });

    // chart instantiation based on current user data
  }
}

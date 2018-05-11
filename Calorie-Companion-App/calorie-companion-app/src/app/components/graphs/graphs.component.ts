
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GraphService } from '../../services/graph.service';
import { Chart } from 'chart.js';
import { FoodBank } from '../../models/FoodBank';
import { User } from '../../models/User';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  user: User = new User();
  loggedUser = JSON.parse(localStorage.getItem('user'));
  /* holds all user data */
  userData: FoodBank[] = new Array();
  /* holds user data aggretated by day */
  sortedData: FoodBank[] = new Array();
  // dateMessage
  dateMessage = 'Enter the start and end dates';
  // chart array to hold our graphs
  chart;
  // arrays of individual values for use with chart array
  calories = [];
  protein = [];
  fats = [];
  carbs = [];
  times = [];
  // line data to show standards
  caloriesLine = [];
  proteinLine = [];
  fatsLine = [];
  carbsLine = [];
  // line standard
  calorieStandard = 1000;
  proteinStandard = 50;
  fatsStandard = 60;
  carbsStandard = 70;

  dateStartIndex = 0;
  dateEndIndex = undefined;


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
    fromDate.setDate(fromDate.getDate() - 1); // decrement cause glitch
    const toDate = new Date(to);
    toDate.setDate(toDate.getDate() + 1); // increment cause glitch
    if (fromDate.valueOf() >= toDate.valueOf()) {
      this.dateMessage = '\tFrom date must be earlier than To date!';
      return;
    }
    // finding start index from left of array
    for (let i = 0; i <= this.userData.length; i++) {
      if (new Date(this.userData[i].time) > fromDate) {
        this.dateStartIndex = i;
        break;
      }
    }
    // finding end index from right of array
    for (let i = this.userData.length - 1; i >= 0; i--) {
      if (new Date(this.userData[i].time) < toDate) {
        this.dateEndIndex = i + 1;
        break;
      }
    }

    console.log(this.dateStartIndex, this.dateEndIndex);
    console.log(this.userData[this.dateStartIndex].time, this.userData[this.dateEndIndex].time);
    this.sortedData = this.getDailyData(this.userData.slice(this.dateStartIndex, this.dateEndIndex + 1));
    console.log('sliced: ' + this.sortedData[0]);
    this.refreshChart();

    console.log(this.chart.data.labels);

  }

  /* Reset charts with new data */
  refreshChart() {

    console.log(this.chart);

    this.calories = [];
    this.protein = [];
    this.fats = [];
    this.carbs = [];
    this.times = [];

    for (let i = 0; i < this.sortedData.length; i++) {
      this.calories.push(this.sortedData[i].calories);
      this.protein.push(this.sortedData[i].protein);
      this.fats.push(this.sortedData[i].fats);
      this.carbs.push(this.sortedData[i].carbs);
      this.times.push(this.sortedData[i].time);
    }

    this.chart.data.labels = this.times;
    console.log(this.times);
    this.chart.data.datasets[0].data = this.calories;
    console.log(this.calories);
    this.chart.data.datasets[1].data = this.protein;
    console.log(this.protein);
    this.chart.data.datasets[2].data = this.fats;
    console.log(this.fats);
    this.chart.data.datasets[3].data = this.carbs;
    console.log(this.carbs);

    this.chart.update();
    console.log(this.chart);
  }

  /* uses all use data to create an accumulation of nutrients on a per day basis */
  getDailyData(foods: FoodBank[]): FoodBank[] {

    const dailyFoods = new Array();

    let currentDate = foods[0].time;
    let caloriesVal = foods[0].calories;
    let proteinVal = foods[0].protein;
    let fatsVal = foods[0].fats;
    let carbsVal = foods[0].carbs;

    // dailyFoods.push({
    //   calories: caloriesVal,
    //   protein: proteinVal,
    //   fats: fatsVal,
    //   carbs: carbsVal,
    //   time: currentDate});

    for (let i = 1; i < foods.length; i++) {

      if (new Date(foods[i].time).getDay() === new Date(currentDate).getDay()) {

        currentDate = foods[i].time;
        caloriesVal += foods[i].calories;
        proteinVal += foods[i].protein;
        fatsVal += foods[i].fats;
        carbsVal += foods[i].carbs;

        // dailyFoods.push({
        //   calories: caloriesVal,
        //   protein: proteinVal,
        //   fats: fatsVal,
        //   carbs: carbsVal,
        //   time: currentDate});

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
    // populate line standard arrays
    for (let i = 0; i < foods.length; i++) {
      this.caloriesLine.push(this.calorieStandard);
      this.proteinLine.push(this.proteinStandard);
      this.fatsLine.push(this.fatsStandard);
      this.carbsLine.push(this.carbsStandard);
    }

    return dailyFoods;
  }

  constructor(private graphService: GraphService) { }

  ngOnInit() {
    if (this.loggedUser !== null) {
      // must be changed when we implement user data requests
      this.graphService.getUserFoodHistory(this.loggedUser.id).subscribe(foods => {
        this.userData = foods;
        // user data must be sorted
        this.userData.sort(
          function (a, b) { return new Date(a.time).getTime() - new Date(b.time).getTime(); });
        console.log(this.userData);
        // sort data into individual days
        this.sortedData = this.getDailyData(this.userData); // this.getDailyData(this.userData);

        for (let i = 0; i < this.sortedData.length; i++) {
          this.calories.push(this.sortedData[i].calories);
          this.protein.push(this.sortedData[i].protein);
          this.fats.push(this.sortedData[i].fats);
          this.carbs.push(this.sortedData[i].carbs);
          this.times.push(this.sortedData[i].time);
        }
        // all user food populated, instantiating chart
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
            // }, {
            //   label: 'cal',
            //   data: this.caloriesLine,
            //   type: 'line',
            //   backgroundColor: 'rgba(0, 0, 0, 0)',
            //   borderColor: 'rgba(180, 0, 0, 0.5)'
            // }, {
            //   label: 'prot',
            //   data: this.proteinLine,
            //   type: 'line',
            //   backgroundColor: 'rgba(0, 0, 0, 0)',
            //   borderColor: 'rgba(180, 0, 0, 0.5)'
            // }, {
            //   label: 'fat',
            //   data: this.fatsLine,
            //   type: 'line',
            //   backgroundColor: 'rgba(0, 0, 0, 0)',
            //   borderColor: 'rgba(180, 0, 0, 0.5)'
            // }, {
            //   label: 'carb',
            //   data: this.carbsLine,
            //   type: 'line',
            //   backgroundColor: 'rgba(0, 0, 0, 0)',
            // borderColor: 'rgba(180, 0, 0, 0.5)'
            }]
          },
          options: {
            multiTooltipTemplate: '<%= value + " %" %>',
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  minUnit: 'day'
                },
                distribution: 'linear'
              }]
            }
          }
        });
      });
      // end of chart instantiation
    }
  }
}

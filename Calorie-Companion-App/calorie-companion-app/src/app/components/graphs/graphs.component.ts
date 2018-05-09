import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GraphService } from '../../services/graph.service';

// Chart.js Dependencies for the charts
import { Chart } from 'chart.js';

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
  userData = [];
  // dateMessage
  dateMessage = 'Enter the start and end dates';
  // chart object to hold our graphs
  chart = [];
  // arrays of individual values
  calories = [];
  protein = [];
  fats = [];
  carbs = [];
  times = [];

  /* testing array of foodstuffs */
  testData = [
    {'id': 10,
     'userId': 1,
     'name': 'Pepe',
     'calories': 100,
     'protein': 13,
     'fats': 18,
     'carbs': 26,
     'time': new Date(2018, 4, 2, 7, 20, 51, 123)},
     {'id': 11,
     'userId': 1,
     'name': 'Pepe',
     'calories': 180,
     'protein': 20,
     'fats': 12,
     'carbs': 22,
     'time': new Date(2018, 4, 2, 7, 20, 52, 456)},
     {'id': 12,
     'userId': 1,
     'name': 'Pepe',
     'calories': 80,
     'protein': 3,
     'fats': 15,
     'carbs': 10,
     'time': new Date(2018, 4, 2, 7, 20, 53, 456)},
     {'id': 13,
     'userId': 1,
     'name': 'Pepe',
     'calories': 180,
     'protein': 20,
     'fats': 12,
     'carbs': 22,
     'time': new Date(2018, 4, 2, 12, 28, 1, 789)},
     {'id': 14,
     'userId': 1,
     'name': 'Pepe',
     'calories': 100,
     'protein': 9,
     'fats': 20,
     'carbs': 29,
     'time': new Date(2018, 4, 2, 12, 28, 1, 789)},
     {'id': 11,
     'userId': 1,
     'name': 'Pepe',
     'calories': 140,
     'protein': 20,
     'fats': 12,
     'carbs': 22,
     'time': new Date(2018, 4, 2, 19, 11, 20, 789)},
     {'id': 11,
     'userId': 1,
     'name': 'Pepe',
     'calories': 140,
     'protein': 20,
     'fats': 12,
     'carbs': 22,
     'time': new Date(2018, 4, 3, 7, 19, 47, 123)},
     {'id': 11,
     'userId': 1,
     'name': 'Pepe',
     'calories': 80,
     'protein': 20,
     'fats': 12,
     'carbs': 22,
     'time': new Date(2018, 4, 3, 7, 19, 47, 123)},
     {'id': 11,
     'userId': 1,
     'name': 'Pepe',
     'calories': 120,
     'protein': 20,
     'fats': 12,
     'carbs': 22,
     'time': new Date(2018, 4, 4, 7, 20, 52, 456)},
     {'id': 11,
     'userId': 1,
     'name': 'Pepe',
     'calories': 100,
     'protein': 20,
     'fats': 12,
     'carbs': 22,
     'time': new Date(2018, 4, 5, 8, 31, 59, 0)},
  ];
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

    }

  constructor(private graphService: GraphService) { }

  ngOnInit() {
    // must be changed when we implement user data requests
    this.userData = this.testData;
    this.graphService.getUserFoodHistory(7).subscribe( foods =>  {
      this.userData = foods;
      console.log('foods are:\n');
      console.log(this.userData);
        // this.graphService.subscribers.next(users);
        // left off here
      for (let i = 0; i < this.userData.length; i++) {
        this.calories.push(this.userData[i].calories);
        this.protein.push(this.userData[i].protein);
        this.fats.push(this.userData[i].fats);
        this.carbs.push(this.userData[i].carbs);
        this.times.push(this.userData[i].time);
      }
    });

    // chart instantiation based on current user data
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#ff8500';
    this.chart = new Chart('canvas', {
      type: 'line',
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
  // test stuff
  console.log(this.testData);
  }

}

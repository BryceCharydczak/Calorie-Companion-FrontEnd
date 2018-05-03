import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FoodComponent } from './food/food.component';

import { FoodInfoService } from './food-info.service';
import { FoodChartComponent } from './food-chart/food-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    FoodComponent,
    FoodChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    FoodInfoService,
    FoodChartComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

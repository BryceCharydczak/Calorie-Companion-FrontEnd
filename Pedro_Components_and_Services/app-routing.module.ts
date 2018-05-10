import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { FoodComponent } from './food/food.component';

export const routes: Routes = [
  {path: '', redirectTo: 'app-food', pathMatch: 'full'},
  {path: 'app-food', component: FoodComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }

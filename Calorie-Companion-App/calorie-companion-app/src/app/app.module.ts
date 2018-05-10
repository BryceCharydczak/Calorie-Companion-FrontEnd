// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

// Calendar for Datepicker bootstrap from NGX-Datepicker
// https://github.com/kekeh/ngx-mydatepicker
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavComponent } from './components/nav/nav.component';
import { LandingComponent } from './components/landing/landing.component';
import { SummaryComponent } from './components/summary/summary.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { AddmealsComponent } from './components/addmeals/addmeals.component';
import { FoodsearchComponent } from './components/foodsearch/foodsearch.component';
import { FooterComponent } from './components/footer/footer.component';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Services
import { UserService } from '../app/services/user.service';
import { FoodInfoService } from '../app/services/food-info.service';
import { GraphService } from './services/graph.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    NavComponent,
    LandingComponent,
    SummaryComponent,
    GraphsComponent,
    AddmealsComponent,
    FoodsearchComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgxMyDatePickerModule.forRoot()

  ],
  providers: [ UserService, FoodInfoService, GraphService],

  bootstrap: [AppComponent]
})
export class AppModule { }

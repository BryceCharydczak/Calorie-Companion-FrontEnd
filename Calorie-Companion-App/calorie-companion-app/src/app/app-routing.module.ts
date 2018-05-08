// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router} from '@angular/router';

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

export const routes: Routes = [
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: 'landing', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'summary', component: SummaryComponent },
    { path: 'graphs', component: GraphsComponent },
    { path: 'addmeals', component: AddmealsComponent },
    { path: 'foodsearch', component: FoodsearchComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NgCountUpComponent} from './pages/ng-count-up-js/component';
import {NgMomentPipesComponent} from './pages/ng-moment-pipes/component';
import {NgRestHttpComponent} from './pages/ng-rest-http/component';

const routes: Routes = [
  { path: 'ng-count-up-js', component: NgCountUpComponent },
  { path: 'ng-moment-pipes', component: NgMomentPipesComponent },
  { path: 'ng-rest-http', component: NgRestHttpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

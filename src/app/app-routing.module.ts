import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NgCountUpComponent} from './pages/ng-count-up-js/component';
import {NgMomentPipesComponent} from './pages/ng-moment-pipes/component';

const routes: Routes = [
  { path: 'ng-count-up-js', component: NgCountUpComponent },
  { path: 'ng-moment-pipes', component: NgMomentPipesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NgCountUpComponent} from './pages/ng-count-up-js/component';

const routes: Routes = [
  { path: 'ng-count-up-js', component: NgCountUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

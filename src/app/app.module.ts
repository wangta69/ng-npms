import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { MomentPipesModule } from './projects/ng-moment-pipes/src/public-api';
import { MomentPipesModule } from 'ng-moment-pipes';


import { CountUpModule } from 'ng-count-up-js';
import { RestHttpClientModule } from './projects/ng-rest-http/src/public-api';
// import { RestHttpClientModule } from 'ng-rest-http'
import { SocketMultiService } from 'ng-node-socket';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NgCountUpComponent} from './pages/ng-count-up-js/component';
import {NgMomentPipesComponent} from './pages/ng-moment-pipes/component';
import {NgRestHttpComponent} from './pages/ng-rest-http/component';

// import { SocketMultiService } from '../../projects/ng-node-socket/src/public-api';
@NgModule({
  declarations: [
    AppComponent,
    NgCountUpComponent,
    NgMomentPipesComponent,
    NgRestHttpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MomentPipesModule,
    CountUpModule,
    RestHttpClientModule
  ],
  providers: [SocketMultiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

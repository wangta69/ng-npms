import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MomentPipesModule } from './projects/ng-moment-pipes/src/public-api';
// import { MomentPipesModule } from 'ng-moment-pipes';

// import { CountUpModule } from './projects/ng-count-up-js/src/public-api';
import { CountUpModule } from 'ng-count-up-js';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketMultiService } from 'ng-node-socket';

import {NgCountUpComponent} from './pages/ng-count-up-js/component';
import {NgMomentPipesComponent} from './pages/ng-moment-pipes/component';

// import { SocketMultiService } from '../../projects/ng-node-socket/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    NgCountUpComponent,
    NgMomentPipesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MomentPipesModule,
    CountUpModule
  ],
  providers: [SocketMultiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MomentPipesModule } from 'ng-moment-pipes';
import { SocketMultiService } from 'ng-node-socket';
// import { CountUpModule } from 'ng-count-up-js';
import { CountUpModule } from '../../projects/ng-count-up-js/src/public-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
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

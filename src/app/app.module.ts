import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonServiceModule } from 'ng-functions';
import { RestHttpClientModule } from 'ng-rest-http';
import { LocalStorageService } from 'ng-storages';
import { PipesFiltersModule } from 'ng-pipe-filter';
import { SocketService } from 'ng-node-socket';
import { MomentPipesModule } from 'ng-moment-pipes';
import { NgEasingService } from 'ng-easing';
import { CountUpModule } from 'ng-count-up-js';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonServiceModule,
    RestHttpClientModule,
    PipesFiltersModule,
    MomentPipesModule,
    CountUpModule
  ],
  providers: [ LocalStorageService, SocketService, NgEasingService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

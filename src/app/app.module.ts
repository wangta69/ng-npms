import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonServiceModule } from '../../projects/ng-functions/src/public_api';
import { RestHttpClientModule } from '../../projects/ng-rest-http/src/public_api';
import { LocalStorageService } from '../../projects/ng-storages/src/public_api';
// import { PipesFiltersModule } from 'ng-pipe-filter';
import { PipesFiltersModule } from '../../projects/ng-pipe-filter/src/public_api';
import { SocketMultiService } from '../../projects/ng-node-socket/src/public_api';
import { MomentPipesModule } from '../../projects/ng-moment-pipes/src/public_api';
import { NgEasingService } from '../../projects/ng-easing/src/public_api';
import { CountUpModule } from '../../projects/ng-count-up-js/src/public_api';
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
  providers: [ LocalStorageService, SocketMultiService, NgEasingService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

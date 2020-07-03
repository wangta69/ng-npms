import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SocketMultiService } from 'ng-node-socket';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SocketMultiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

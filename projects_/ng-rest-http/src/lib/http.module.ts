import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RestHttpClient } from './http.service';
import { UploadService } from './upload.service';

@NgModule({
  imports: [ HttpClientModule ],
  providers: [ RestHttpClient, UploadService ]
})
export class RestHttpClientModule {}

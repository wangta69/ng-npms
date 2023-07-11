import { NgModule } from '@angular/core';
import { OnlyNumberPipe } from './bool/only-number.pipe';

export * from './bool/only-number.pipe';

@NgModule({
  declarations: [
    OnlyNumberPipe
  ],
  exports: [
    OnlyNumberPipe
  ]
})
export class BooleanPipesModule {
}

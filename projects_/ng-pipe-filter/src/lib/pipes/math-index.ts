import { NgModule } from '@angular/core';
import { RangePipe } from './math/range.pipe';
export * from './math/range.pipe';

@NgModule({
  declarations: [
    RangePipe
  ],
  exports: [
    RangePipe
  ]
})
export class MathPipesModule {
}

import { NgModule } from '@angular/core';

import { BooleanPipesModule } from './pipes/bool-index';
import { MathPipesModule } from './pipes/math-index';
import { ObjectPipesModule } from './pipes/object-index';
import { StringPipesModule } from './pipes/string-index';
@NgModule({
  exports: [
    BooleanPipesModule,
    MathPipesModule,
    ObjectPipesModule,
    StringPipesModule
  ]
})
export class PipesFiltersModule {}

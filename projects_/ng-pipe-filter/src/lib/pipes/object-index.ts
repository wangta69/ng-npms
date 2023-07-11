import { NgModule } from '@angular/core';

import { ToArrayPipe } from './object/to-array.pipe';
import { ToKeyValPipe } from './object/to-key-val.pipe';
import { ToKeyPipe } from './object/to-key.pipe';

export * from './object/to-array.pipe';
export * from './object/to-key-val.pipe';
export * from './object/to-key.pipe';

@NgModule({
  declarations: [
    ToArrayPipe,
    ToKeyValPipe,
    ToKeyPipe
  ],
  exports: [
    ToArrayPipe,
    ToKeyValPipe,
    ToKeyPipe
  ]
})
export class ObjectPipesModule {
}

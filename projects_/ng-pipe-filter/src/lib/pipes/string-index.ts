import { NgModule } from '@angular/core';
import { CommaAddPipe } from './string/comma-add.pipe';
import { CommaRemovePipe } from './string/comma-remove.pipe';
import { Nl2brPipe } from './string/nl2br.pipe';
import { StripTagsPipe } from './string/strip-tags.pipe';

export * from './string/comma-add.pipe';
export * from './string/comma-remove.pipe';
export * from './string/nl2br.pipe';
export * from './string/strip-tags.pipe';

@NgModule({
  declarations: [
    CommaAddPipe,
    CommaRemovePipe,
    StripTagsPipe,
    Nl2brPipe,
  ],
  exports: [
    CommaAddPipe,
    CommaRemovePipe,
    StripTagsPipe,
    Nl2brPipe,
  ]
})
export class StringPipesModule {
}

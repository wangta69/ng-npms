import { NgModule } from '@angular/core';
import { MomentPipe } from './moment.pipe';
import { MomentLocalPipe } from './momentLocal.pipe';
import { MomentUnixPipe } from './momentUnix.pipe';

import { MomentRelativeOfPipe, MomentRelativePipe} from './momentRelative.pipe';

@NgModule({
  declarations: [
    MomentPipe,
    MomentUnixPipe,
    MomentRelativePipe,
    MomentRelativeOfPipe,
    MomentLocalPipe,
  ],
  exports: [
    MomentPipe,
    MomentUnixPipe,
    MomentRelativePipe,
    MomentRelativeOfPipe,
    MomentLocalPipe,
  ]
})
export class MomentPipesModule {}

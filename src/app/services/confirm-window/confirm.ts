import { NgModule, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm',
  templateUrl: 'confirm.html',
  styleUrls: ['./confirm.scss']
})
export class ConfirmComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    }
    cancel(): void {
        this.dialogRef.close(false);
    }
    confirm(): void {
        this.dialogRef.close(true);
    }
}

@NgModule({
    declarations: [
        ConfirmComponent
    ],
    imports: [
        MatDialogModule,
        TranslateModule.forChild(),
        CommonModule
    ],
    entryComponents: [
        ConfirmComponent
    ]
})
export class ConfirmModule {}

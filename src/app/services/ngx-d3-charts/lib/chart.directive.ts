import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[chart-host]'
})
export class ChartDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

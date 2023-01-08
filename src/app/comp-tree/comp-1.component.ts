import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AbstractChangeDetectionComponent, CMP_NAME } from "../abstract-change-detection.component";
import { template } from "../change-detection.component.template";
import { Destroy } from "../helpers/destroy";
import { ColorService } from "../services/color.service";

const NAME = "comp-1";
const CD_STRATEGY = ChangeDetectionStrategy.Default;
const CHILD_TEMPLATE = `
<app-comp-1-1 [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable">
     <app-comp-1-x-3 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable">
        <app-comp-1-x-3-3 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-3-3>
        <app-comp-1-x-3-4 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-3-4>
     </app-comp-1-x-3>
     <app-comp-1-x-4 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable">
        <app-comp-1-x-4-3 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-4-3>
        <app-comp-1-x-4-4 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-4-4>
     </app-comp-1-x-4>
  </app-comp-1-1>
  <app-comp-1-2 [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable">
     <app-comp-1-x-3 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable">
        <app-comp-1-x-3-3 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-3-3>
        <app-comp-1-x-3-4 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-3-4>
      </app-comp-1-x-3>
     <app-comp-1-x-4 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable">
        <app-comp-1-x-4-3 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-4-3>
        <app-comp-1-x-4-4 [contentChild]="true" [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-4-4>
      </app-comp-1-x-4>
  </app-comp-1-2>`;

@Component({
  selector: `app-${NAME}`,
  template: template(CHILD_TEMPLATE),
  styleUrls: ["./../change-detection.component.scss"],
  providers: [ColorService, Destroy, { provide: CMP_NAME, useValue: NAME }],
  changeDetection: CD_STRATEGY,
})
export class Comp_1_Component extends AbstractChangeDetectionComponent {}

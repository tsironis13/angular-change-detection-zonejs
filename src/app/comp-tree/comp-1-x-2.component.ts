import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AbstractChangeDetectionComponent, CMP_NAME, LEVEL } from "../abstract-change-detection.component";
import { template } from "../change-detection.component.template";
import { Destroy } from "../helpers/destroy";
import { ColorService } from "../services/color.service";

const NAME = "comp-1-x-2";

const CD_STRATEGY = ChangeDetectionStrategy.OnPush;
const CHILD_TEMPLATE = `
  <app-comp-1-x-2-1 [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-2-1>
  <app-comp-1-x-2-2 [inputByVal]="inputByVal" [inputByRef]="inputByRef" [inputObservable]="inputObservable"></app-comp-1-x-2-2>
`;

@Component({
  selector: `app-${NAME}`,
  template: template(CHILD_TEMPLATE),
  styleUrls: ["./../change-detection.component.scss"],
  providers: [ColorService, Destroy, { provide: CMP_NAME, useValue: NAME }, { provide: LEVEL, useValue: 3 }],
  changeDetection: CD_STRATEGY,
})
export class Comp_1_x_2_Component extends AbstractChangeDetectionComponent {}

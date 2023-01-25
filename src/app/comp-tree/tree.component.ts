import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LEVEL } from '../abstract-change-detection.component';
import { ValueService } from '../services/value.service';

@Component({
  template: `<app-comp-1 [inputByRef]="valueService.inputByRef" [inputByVal]="valueService.inputByVal" [inputObservable]="valueService.inputObservable"/>`,
  selector: 'app-tree',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: LEVEL, useValue: 1 }],
})
export class TreeComponent {
  valueService = inject(ValueService);
}

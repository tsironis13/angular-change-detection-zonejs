import { Directive, ElementRef } from "@angular/core";
import { takeUntil } from "rxjs";
import { DirtyCheckColoringService } from "./dirty-check-coloring.service";
import { Destroy } from "./helpers/destroy";

@Directive({ selector: "[disableWhenBusy]", providers: [Destroy], standalone: true })
export class DisableWhenBusyDirective {
  constructor(
    private _dirtyCheckColoringService: DirtyCheckColoringService,
    private destroy$: Destroy,
    private elementRef: ElementRef
  ) {
    this._dirtyCheckColoringService.busy$.pipe(takeUntil(this.destroy$)).subscribe((busy) => {
      this.elementRef.nativeElement.disabled = busy;
    });
  }
}

import { Directive, ElementRef } from "@angular/core";
import { takeUntil } from "rxjs";
import { Destroy } from "./helpers/destroy";
import { DirtyCheckColoringService } from "./services/dirty-check-coloring.service";

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

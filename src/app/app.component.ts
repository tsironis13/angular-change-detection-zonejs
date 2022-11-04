import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { fromEvent, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { DirtyCheckColoringService } from "./dirty-check-coloring.service";
import { CD_STRATEGY, LEVEL } from "./dynamic-children/dynamic-children.component";
import { ExpandCollapseService, State } from "./expand-collapse.service";
import { NumberHolder } from "./number-holder";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [
    { provide: LEVEL, useValue: 1 },
    { provide: CD_STRATEGY, useValue: ChangeDetectionStrategy.Default },
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();

  private value = 0;
  protected inputByVal!: number;
  protected inputByRef = new NumberHolder();
  protected inputObservable = new Subject<number>();

  @ViewChild("apptick_button", { static: true }) private _apptickButton!: ElementRef;
  @ViewChild("timeout_button", { static: true }) private _timeoutButton!: ElementRef;
  @ViewChild("trigger_change", { static: true }) private _triggerChangeButton!: ElementRef;
  @ViewChild("clear", { static: true }) private _clearButton!: ElementRef;
  @ViewChild("auto_clear", { static: true }) private _autoClearCheckbox!: ElementRef<HTMLInputElement>;
  @ViewChild("toggle_content_children", { static: true }) private _toggleContentChildren!: ElementRef<HTMLElement>;
  @ViewChild("input_value_field", { static: true }) private _inputValueField!: ElementRef<HTMLElement>;

  @ViewChild("propagate_by_value_checkbox", { static: true })
  private _propagateByValueCheckbox!: ElementRef<HTMLInputElement>;

  @ViewChild("propagate_by_ref_checkbox", { static: true })
  private _propagateByRefCheckbox!: ElementRef<HTMLInputElement>;

  @ViewChild("propagate_by_observable_checkbox", { static: true })
  private _propagateByObservableCheckbox!: ElementRef<HTMLInputElement>;

  @ViewChild("propagate_in_zone_checkbox", { static: true })
  private _propagateInZoneCheckbox!: ElementRef<HTMLInputElement>;

  constructor(
    private _zone: NgZone,
    private _appRef: ApplicationRef,
    private _dirtyCheckColoringService: DirtyCheckColoringService,
    private _expandCollapseService: ExpandCollapseService
  ) {}

  public ngOnInit(): void {
    this._dirtyCheckColoringService.setAutoClearColoring(this.isAutoClear());

    this._zone.runOutsideAngular(() => {
      // apptick
      fromEvent(this._apptickButton.nativeElement, "click")
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => {
          this._dirtyCheckColoringService.clearColoring();
          this._appRef.tick();
        });

      // timeout
      fromEvent(this._timeoutButton.nativeElement, "click")
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => {
          setTimeout(() => this._zone.run(() => console.log(`setTimeout(...)`)), 3000);
        });

      // clear auto checkbox
      fromEvent(this._autoClearCheckbox.nativeElement, "change")
        .pipe(
          takeUntil(this._destroy$),
          map((event: Event) => event.target as HTMLInputElement)
        )
        .subscribe((element) => {
          this._dirtyCheckColoringService.setAutoClearColoring(element.checked);
        });

      // clear
      fromEvent(this._clearButton.nativeElement, "click")
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => {
          this._dirtyCheckColoringService.clearColoring();
        });

      // Change input
      fromEvent(this._triggerChangeButton.nativeElement, "click")
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => {
          if (this.isPropagateInZone()) {
            this._zone.run(() => this.updateInputValue());
          } else {
            this.updateInputValue();
          }
        });

      // Toggle content children
      fromEvent(this._toggleContentChildren.nativeElement, "click")
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => this._expandCollapseService.toggleContentChildren());

      // Toggle ContentChildren
      this._expandCollapseService.contentChildren$.pipe(takeUntil(this._destroy$)).subscribe((state) => {
        const button = this._toggleContentChildren.nativeElement;
        button.innerHTML = state === State.Expand ? "Collapse ContentChildren" : "Expand ContentChildren";
      });

      // Busy
      this._dirtyCheckColoringService.busy$.pipe(takeUntil(this._destroy$)).subscribe((busy) => {
        if (busy && !this._dirtyCheckColoringService.isAutoClearColoring) {
          this._clearButton.nativeElement.classList.add("emphasize");
        } else {
          this._clearButton.nativeElement.classList.remove("emphasize");
        }
      });
    });
  }

  public clickNoop(): void {
    console.log(`click`);
  }

  public ngOnDestroy(): void {
    this._destroy$.complete();
  }

  private updateInputValue(): void {
    this.value++;
    if (this.isPropagateByValue()) {
      this.inputByVal = this.value;
    }
    if (this.isPropagateByRef()) {
      this.inputByRef.value = this.value;
    }
    if (this.isPropagateByObservable()) {
      this.inputObservable.next(this.value);
    }

    // Update DOM directly because outside Angular zone to not trigger change detection
    this._inputValueField.nativeElement.innerHTML = this.value.toString(10);
  }

  private isAutoClear(): boolean {
    return this._autoClearCheckbox.nativeElement.checked;
  }

  private isPropagateByValue(): boolean {
    return this._propagateByValueCheckbox.nativeElement.checked;
  }

  private isPropagateByRef(): boolean {
    return this._propagateByRefCheckbox.nativeElement.checked;
  }

  private isPropagateByObservable(): boolean {
    return this._propagateByObservableCheckbox.nativeElement.checked;
  }

  private isPropagateInZone(): boolean {
    return this._propagateInZoneCheckbox.nativeElement.checked;
  }
}

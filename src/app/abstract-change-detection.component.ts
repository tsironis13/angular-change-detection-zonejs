import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  DestroyRef,
  Directive,
  DoCheck,
  ElementRef,
  HostBinding,
  inject,
  Input,
  NgZone,
  OnChanges,
  signal,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { fromEvent, Observable, Subject, timer } from "rxjs";
import { distinctUntilChanged, filter, map, takeUntil, tap } from "rxjs/operators";
import { ColorService } from "./color.service";
import { DirtyCheckColoringService } from "./dirty-check-coloring.service";
import { ExpandCollapseService, State } from "./expand-collapse.service";
import { NumberHolder } from "./number-holder";
import { WarningService } from "./warning.service";

@Directive()
export abstract class AbstractChangeDetectionComponent implements AfterViewInit, OnChanges, DoCheck {
  private destroyRef = inject(DestroyRef);
  private _destroyInputObservable$ = new Subject<void>();
  private _expandCollapseState = State.Expand;
  private _childType = ChildType.ViewChild;

  @ViewChild("component", { static: true }) private _componentField!: ElementRef;
  @ViewChild("mfc_button", { static: true }) private _mfcButton!: ElementRef;
  @ViewChild("dc_button", { static: true }) private _dcButton!: ElementRef;
  @ViewChild("detach_button", { static: true }) private _detachButton!: ElementRef;
  @ViewChild("attach_button", { static: true }) private _attachButton!: ElementRef;
  @ViewChild("click_button", { static: true }) private _clickButton!: ElementRef;
  @ViewChild("signal_button", { static: true }) private _signalButton!: ElementRef;
  @ViewChild("toggle_visiblity", { static: true }) private _toggleVisiblity!: ElementRef;
  @ViewChild("cd_state_box", { static: true }) private _cdStateBox!: ElementRef;
  @ViewChild("ng_do_check_box", { static: true }) private _ngDoCheckBox!: ElementRef;
  @ViewChild("ng_on_changes_box", { static: true }) private _ngOnChangesBox!: ElementRef;
  @ViewChild("ng_marked", { static: true }) private _ngMarked!: ElementRef;

  @Input() public inputByRef!: NumberHolder;

  @Input() public inputByVal!: number;

  @Input() public inputObservable!: Observable<number>;

  @Input()
  public set contentChild(contentChild: boolean) {
    this._childType = contentChild ? ChildType.ContentChild : ChildType.ViewChild;
  }

  @HostBinding("attr.class")
  public get hostClass(): string {
    const childType = this._childType === ChildType.ViewChild ? "view-child" : "content-child";
    return `${this.cdStrategyName} ${childType} level-${this._level}`;
  }

  public inputObservableValue!: number;
  public cdStrategyName: string;
  public markedAsDirty: boolean = false;

  private _hostRef = inject(ElementRef);
  private _colorService = inject(ColorService);
  private _dirtyCheckColoringService = inject(DirtyCheckColoringService);
  private _expandCollapseService = inject(ExpandCollapseService);
  private _cd = inject(ChangeDetectorRef);
  private _zone = inject(NgZone);
  private _warningService = inject(WarningService);
  protected signal = signal(0);

  constructor(
    public name: string,
    private _level: number,
    cdStrategy: ChangeDetectionStrategy,
  ) {
    this.cdStrategyName = resolveChangeDetectionStrategyName(cdStrategy);
  }

  public ngAfterViewInit(): void {
    this._attachButton.nativeElement.style.display = "none";

    // install outside Angular zone to not trigger change detection upon button click
    this._zone.runOutsideAngular(() => {
      timer(0, 500)
        .pipe(
          map(() => isDirty(this._cd)),
          distinctUntilChanged(),
        )
        .subscribe((isDirty) => {
          this.markedAsDirty = isDirty;
          this._ngMarked.nativeElement.style.display = isDirty ? "inline" : "none";
        });

      // Detect Changes manually
      fromEvent(this._dcButton.nativeElement, "click")
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          tap(() => this._dirtyCheckColoringService.clearColoring()),
        )
        .subscribe(() => {
          console.log(`ChangeDetectorRef.detectChanges() for ${this.name}`);
          this._cd.detectChanges();
        });

      // Mark for check
      fromEvent(this._mfcButton.nativeElement, "click")
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          tap(() => this._dirtyCheckColoringService.clearColoring()),
        )
        .subscribe(() => {
          console.log(`ChangeDetectorRef.markForCheck() for ${this.name}`);
          this._cd.markForCheck();
          this._warningService.showWarning();
        });

      // Detach change detector
      fromEvent(this._detachButton.nativeElement, "click")
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          tap(() => this._dirtyCheckColoringService.clearColoring()),
        )
        .subscribe(() => {
          console.log(`ChangeDetectorRef.detach() for ${this.name}`);
          this._cd.detach();
          this._colorService.colorChangeDetectorDetached(this._cdStateBox);
          this._detachButton.nativeElement.style.display = "none"; // because outside Angular zone
          this._attachButton.nativeElement.style.display = "inline";
        });

      // Attach change detector
      fromEvent(this._attachButton.nativeElement, "click")
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          tap(() => this._dirtyCheckColoringService.clearColoring()),
        )
        .subscribe(() => {
          console.log(`ChangeDetectorRef.reattach() for ${this.name}`);
          this._cd.reattach();
          this._colorService.colorChangeDetectorAttached(this._cdStateBox);
          this._detachButton.nativeElement.style.display = "inline"; // because outside Angular zone
          this._attachButton.nativeElement.style.display = "none";
        });
      // Signal change
      fromEvent(this._signalButton.nativeElement, "click")
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          tap(() => this._dirtyCheckColoringService.clearColoring()),
        )
        .subscribe(() => {
          console.log("lala");
          this.signal.update((v) => v + 1);
          this._warningService.showWarning();
          //this._zone.run(() => {});
        });

      // Toggle visibility
      fromEvent(this._toggleVisiblity.nativeElement, "click")
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          const toggledState = this._expandCollapseState === State.Expand ? State.Collapse : State.Expand;
          this.setExpandCollapseState(toggledState);
        });

      this._dirtyCheckColoringService.busy$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((busy) => {
        this._dcButton.nativeElement.disabled = busy;
        this._mfcButton.nativeElement.disabled = busy;
        this._attachButton.nativeElement.disabled = busy;
        this._detachButton.nativeElement.disabled = busy;
        this._clickButton.nativeElement.disabled = busy;
        this._signalButton.nativeElement.disabled = busy;
      });

      this._expandCollapseService.contentChildren$
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          filter(() => this._childType === ChildType.ContentChild),
        )
        .subscribe((state) => this.setExpandCollapseState(state));
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.inputObservable) {
      this._destroyInputObservable$.next();
      this.inputObservable
        .pipe(takeUntilDestroyed(this.destroyRef), takeUntil(this._destroyInputObservable$))
        .subscribe((value) => (this.inputObservableValue = value));
    }
    this._colorService.colorNgOnChanges(this._ngOnChangesBox);
  }

  public ngDoCheck(): void {
    this._colorService.colorNgDoCheck(this._ngDoCheckBox);
  }

  public get touch(): void {
    return this._colorService.colorDirtyCheck(this._hostRef);
  }

  public onClick(): void {
    this._warningService.hideWarning();
    console.log(`Click for ${this.name}`);
  }

  private setExpandCollapseState(state: State): void {
    this._expandCollapseState = state;
    if (state === State.Expand) {
      this._componentField.nativeElement.style.display = "inline";
      this._toggleVisiblity.nativeElement.innerHTML = "-";
    } else {
      this._componentField.nativeElement.style.display = "none";
      this._toggleVisiblity.nativeElement.innerHTML = "+";
    }
  }
}

enum ChildType {
  ViewChild,
  ContentChild,
}

function resolveChangeDetectionStrategyName(strategy: ChangeDetectionStrategy): string {
  return ChangeDetectionStrategy[strategy];
}

function isDirty(cdRef: ChangeDetectorRef): boolean {
  const flags: LComponentView = (cdRef as any)._lView[2];

  return getBit(flags, 5) === 1;
}

type LComponentView = [unknown, unknown, number, ...Array<unknown>];

function getBit(number: any, bitPosition: number): 1 | 0 {
  return (number & (1 << bitPosition)) === 0 ? 0 : 1;
}

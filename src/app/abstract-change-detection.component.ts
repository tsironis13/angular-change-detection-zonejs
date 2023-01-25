import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  DoCheck,
  ElementRef,
  HostBinding,
  inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  Type,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Destroy } from './helpers/destroy';
import { NumberHolder } from './number-holder';
import { ColorService } from './services/color.service';
import { DirtyCheckColoringService } from './services/dirty-check-coloring.service';
import { CheckDirtyService } from './services/dirty-service';
import { ExpandCollapseService, State } from './services/expand-collapse.service';

@Directive({})
export abstract class AbstractChangeDetectionComponent implements OnChanges, OnInit, DoCheck {
  @ViewChild('component', { static: true }) private _componentField!: ElementRef;
  @ViewChild('attach_checkbox', { static: true }) private _attachCheckbox!: ElementRef<HTMLInputElement>;
  @ViewChild('toggle_visiblity', { static: true }) private _toggleVisiblity!: ElementRef;
  @ViewChild('cd_state_box', { static: true }) private _cdStateBox!: ElementRef;
  @ViewChild('ng_do_check_box', { static: true }) private _ngDoCheckBox!: ElementRef;
  @ViewChild('ng_on_changes_box', { static: true }) private _ngOnChangesBox!: ElementRef;
  @ViewChild('ng_marked', { static: true }) private _ngMarked!: ElementRef;

  @Input() public inputByRef: NumberHolder | undefined;

  @Input() public inputByVal: number | undefined;

  @Input() public inputObservable!: Observable<number>;

  @Input()
  public set contentChild(contentChild: boolean) {
    this._childType = contentChild ? 'ContentChild' : 'ViewChild';
  }

  @HostBinding('attr.class')
  public get hostClass(): string {
    const childType = this._childType === 'ViewChild' ? 'view-child' : 'content-child';
    return `${this.cdStrategyName} ${childType} level-${this._level}`;
  }

  protected cdStrategyName!: string;

  protected inputObservableValue = '';
  private _hostRef = inject(ElementRef);
  private _colorService = inject(ColorService);
  private _dirtyCheckColoringService = inject(DirtyCheckColoringService);
  private _expandCollapseService = inject(ExpandCollapseService);
  private _cd = inject(ChangeDetectorRef);
  private _destroy$ = inject(Destroy);
  private dirtyService = inject(CheckDirtyService);
  protected _level = inject(LEVEL);
  protected name = inject(CMP_NAME);

  private _expandCollapseState = State.Expand;
  protected _childType: ChildType = 'ViewChild';
  private _children: Array<ComponentRef<AbstractChangeDetectionComponent>> = [];

  ngOnInit(): void {
    this.inputObservable.subscribe((v) => (this.inputObservableValue = `${v}`));
    this.cdStrategyName = resolveChangeDetectionStrategyName(getStrategy(this._cd));

    this.dirtyService.checkForDirty$.subscribe(() => {
      this._ngMarked.nativeElement.style.display = isDirty(this._cd) ? 'inline' : 'none';
    });

    this._expandCollapseService.contentChildren$
      .pipe(
        takeUntil(this._destroy$),
        filter(() => this._childType === 'ContentChild')
      )
      .subscribe((state) => this.setExpandCollapseState(state));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._colorService.colorNgOnChanges(this._ngOnChangesBox);
    this._children.forEach((childRef) => {
      Object.entries(changes).forEach(([key, change]) => {
        childRef.setInput(key, change.currentValue);
      });
    });
  }

  public ngDoCheck(): void {
    this._colorService.colorNgDoCheck(this._ngDoCheckBox);
  }

  public get touch(): void {
    return this._colorService.colorDirtyCheck(this._hostRef);
  }

  public onClick(): void {
    console.log(`Click `);
  }

  public onClickMarked(): void {
    console.log(`ChangeDetectorRef.markForCheck()`);
    this._dirtyCheckColoringService.clearColoring();
    this.dirtyService.markForCheck(this._cd);
  }

  public onDetachClick(): void {
    console.log(`ChangeDetectorRef.detach()`);
    this._dirtyCheckColoringService.clearColoring();
    this._cd.detach();
    this._colorService.colorChangeDetectorDetached(this._cdStateBox);
    this._attachCheckbox.nativeElement.checked = true;
  }

  public onAttachClick(): void {
    console.log(`ChangeDetectorRef.reattach()`);
    this._dirtyCheckColoringService.clearColoring();
    this._cd.reattach();
    this._colorService.colorChangeDetectorAttached(this._cdStateBox);
    this._attachCheckbox.nativeElement.checked = false;
  }

  public toggleVisibility(): void {
    const toggledState = this._expandCollapseState === State.Expand ? State.Collapse : State.Expand;
    this.setExpandCollapseState(toggledState);
  }

  public onDetectChangesClick(): void {
    console.log(`ChangeDetectorRef.detectChanges()`);
    this._dirtyCheckColoringService.clearColoring();
    this._cd.detectChanges();
  }

  private setExpandCollapseState(state: State): void {
    this._expandCollapseState = state;
    if (state === State.Expand) {
      this._componentField.nativeElement.style.display = 'inline';
      this._toggleVisiblity.nativeElement.innerHTML = '-';
    } else {
      this._componentField.nativeElement.style.display = 'none';
      this._toggleVisiblity.nativeElement.innerHTML = '+';
    }
  }
}

function getLView(cdRef: ChangeDetectorRef): LComponentView {
  return (cdRef as any)._lView;
}

function getStrategy(cdRef: ChangeDetectorRef): ChangeDetectionStrategy {
  const flags = getLView(cdRef)[2];
  return flags & 0b00000010000 ? ChangeDetectionStrategy.Default : ChangeDetectionStrategy.OnPush;
}

function isDirty(cdRef: ChangeDetectorRef): boolean {
  const flags = getLView(cdRef)[2];

  return getBit(flags, 5) === 1;
}

type TNode = any;
type LComponentView = [HTMLElement, unknown, number, Type<any>, unknown, unknown, TNode, ...Array<unknown>];

function getBit(number: number, bitPosition: number): 1 | 0 {
  return (number & (1 << bitPosition)) === 0 ? 0 : 1;
}

function resolveChangeDetectionStrategyName(strategy: ChangeDetectionStrategy): string {
  return ChangeDetectionStrategy[strategy];
}

export type ChildType = 'ViewChild' | 'ContentChild';

export const LEVEL = new InjectionToken<number>('LEVEL');
export const CMP_NAME = new InjectionToken<string>('CMP_NAME');

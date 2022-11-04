import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  DoCheck,
  ElementRef,
  EnvironmentInjector,
  HostBinding,
  inject,
  InjectionToken,
  Injector,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from "@angular/core";
import { distinctUntilChanged, filter, fromEvent, map, Observable, takeUntil, timer } from "rxjs";
import { DirtyCheckColoringService } from "src/app/dirty-check-coloring.service";
import { ExpandCollapseService, State } from "src/app/expand-collapse.service";
import { Destroy } from "src/app/helpers/destroy";
import { NumberHolder } from "src/app/number-holder";
import { ColorService } from "../color.service";
import { DisableWhenBusyDirective } from "../disable.directive";

const template = `
{{touch}}
<button class="toggle-visibility" #toggle_visiblity>-</button>
<div #component class="component">
	<div class="state">
		<span class="strategy-box {{ cdStrategyName }}">{{ cdStrategyName }}</span>
		<span #cd_state_box class="cd-state-box"></span>
		<span #ng_do_check_box class="ng-do-check-box">ngDoCheck</span>
		<span #ng_on_changes_box class="ng-on-changes-box">ngOnChanges</span>
		<span #ng_marked style="display: none">Marked</span>
	</div>
	<table class="input-box">
		<tr>
			<th>input value:</th>
			<td class="input-value">{{ inputByVal }}</td>
		</tr>
		<tr>
			<th>object prop:</th>
			<td class="input-value">{{ inputByRef?.value }}</td>
		</tr>
		<tr>
			<th>observable:</th>
			<td class="input-value">{{ inputObservable | async }}</td>
		</tr>
	</table>
	<div class="control">
		<button disableWhenBusy #dc_button title="Detect changes">DC</button>
		<button disableWhenBusy 
			#mfc_button
			title="Mark for check (only applicable for 'OnPush' strategy; does not trigger change detection)"
		>
			MFC
		</button>
		<button disableWhenBusy  #detach_button title="Detaches ChangeDetector">Detach</button>
		<button disableWhenBusy  #attach_button title="Attaches ChangeDetector">Attach</button>
		<button disableWhenBusy #click_button (click)="onClick()" title="Simple click action from template (ng binding)">Click</button>
	</div>
	<div class="children">
		<div #container></div>
		<!-- view-children -->
		<ng-content></ng-content>
		<!-- content-children -->
	</div>
</div>
`;

@Component({
  selector: "dynamic-children",
  template: template,
  providers: [ColorService, Destroy],
  styleUrls: ["./../change-detection.component.scss"],
  encapsulation: ViewEncapsulation.None,
  imports: [DisableWhenBusyDirective, AsyncPipe],
  standalone: true,
})
export class DynamicChildrenComponent implements OnInit, OnChanges, DoCheck {
  @Input() protected inputByRef!: NumberHolder;
  @Input() protected inputByVal!: number;
  @Input() protected inputObservable!: Observable<number>;
  @Input()
  public set contentChild(contentChild: boolean) {
    this._childType = contentChild ? ChildType.ContentChild : ChildType.ViewChild;
  }

  @ViewChild("component", { static: true }) private _componentField!: ElementRef;
  @ViewChild("mfc_button", { static: true }) private _mfcButton!: ElementRef<HTMLButtonElement>;
  @ViewChild("dc_button", { static: true }) private _dcButton!: ElementRef<HTMLButtonElement>;
  @ViewChild("detach_button", { static: true }) private _detachButton!: ElementRef<HTMLButtonElement>;
  @ViewChild("attach_button", { static: true }) private _attachButton!: ElementRef<HTMLButtonElement>;
  @ViewChild("toggle_visiblity", { static: true }) private _toggleVisiblity!: ElementRef;
  @ViewChild("cd_state_box", { static: true }) private _cdStateBox!: ElementRef;
  @ViewChild("ng_do_check_box", { static: true }) private _ngDoCheckBox!: ElementRef;
  @ViewChild("ng_on_changes_box", { static: true }) private _ngOnChangesBox!: ElementRef;
  @ViewChild("ng_marked", { static: true }) private _ngMarked!: ElementRef;
  @ViewChild("container", { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  @HostBinding("attr.class")
  public get hostClass(): string {
    const childType = this._childType === ChildType.ViewChild ? "view-child" : "content-child";
    return `${this.cdStrategyName} ${childType} level-${this.level}`;
  }

  protected cdStrategyName = resolveChangeDetectionStrategyName(inject(CD_STRATEGY));

  private level = inject(LEVEL);
  private _hostRef = inject(ElementRef);
  private _colorService = inject(ColorService);
  private _dirtyCheckColoringService = inject(DirtyCheckColoringService);
  private _expandCollapseService = inject(ExpandCollapseService);
  private _cd = inject(ChangeDetectorRef);
  private _zone = inject(NgZone);
  private _injector = inject(Injector);
  private _environement = inject(EnvironmentInjector);
  private _destroy$ = inject(Destroy);

  private _expandCollapseState = State.Expand;
  private _childType = ChildType.ViewChild;
  private _children: Array<ComponentRef<DynamicChildrenComponent>> = [];

  ngOnInit(): void {
    if (this.level < 4) {
      this._children = [ChangeDetectionStrategy.Default, ChangeDetectionStrategy.OnPush].map((strat) => {
        return this.createChild(this.level + 1, strat);
      });
    }

    this._attachButton.nativeElement.style.display = "none";

    // install outside Angular zone to not trigger change detection upon button click
    this._zone.runOutsideAngular(() => {
      timer(0, 500)
        .pipe(
          map(() => isDirty(this._cd)),
          distinctUntilChanged()
        )
        .subscribe((isDirty) => {
          this._ngMarked.nativeElement.style.display = isDirty ? "inline" : "none";
        });

      // Detect Changes manually
      fromEvent(this._dcButton.nativeElement, "click")
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => {
          console.log(`ChangeDetectorRef.detectChanges()`);
          this._dirtyCheckColoringService.clearColoring();
          this._cd.detectChanges();
        });

      // Mark for check
      fromEvent(this._mfcButton.nativeElement, "click")
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => {
          console.log(`ChangeDetectorRef.markForCheck()`);
          this._dirtyCheckColoringService.clearColoring();
          this._cd.markForCheck();
        });

      // Detach change detector
      fromEvent(this._detachButton.nativeElement, "click")
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => {
          console.log(`ChangeDetectorRef.detach()`);
          this._dirtyCheckColoringService.clearColoring();
          this._cd.detach();
          this._colorService.colorChangeDetectorDetached(this._cdStateBox);
          this._detachButton.nativeElement.style.display = "none"; // because outside Angular zone
          this._attachButton.nativeElement.style.display = "inline";
        });

      // Attach change detector
      fromEvent(this._attachButton.nativeElement, "click")
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => {
          console.log(`ChangeDetectorRef.reattach()`);
          this._dirtyCheckColoringService.clearColoring();
          this._cd.reattach();
          this._colorService.colorChangeDetectorAttached(this._cdStateBox);
          this._detachButton.nativeElement.style.display = "inline"; // because outside Angular zone
          this._attachButton.nativeElement.style.display = "none";
        });

      // Toggle visibility
      fromEvent(this._toggleVisiblity.nativeElement, "click")
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => {
          const toggledState = this._expandCollapseState === State.Expand ? State.Collapse : State.Expand;
          this.setExpandCollapseState(toggledState);
        });

      this._expandCollapseService.contentChildren$
        .pipe(
          takeUntil(this._destroy$),
          filter(() => this._childType === ChildType.ContentChild)
        )
        .subscribe((state) => this.setExpandCollapseState(state));
    });
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

  private createChild(level: number, cdStrategy: ChangeDetectionStrategy): ComponentRef<DynamicChildrenComponent> {
    return this._environement.runInContext(() => {
      const component = Component({
        selector: "dynamic-children",
        template: template,
        changeDetection: cdStrategy,
        providers: [ColorService, { provide: LEVEL, useValue: level }, { provide: CD_STRATEGY, useValue: cdStrategy }],
        encapsulation: ViewEncapsulation.None,
        imports: [DisableWhenBusyDirective, AsyncPipe],
        standalone: true,
      })(DynamicChildrenComponent);

      const componentRef = this.container.createComponent(component);

      componentRef.setInput("inputByRef", this.inputByRef);
      componentRef.setInput("inputByVal", this.inputByVal);
      componentRef.setInput("inputObservable", this.inputObservable);

      return componentRef;
    });
  }
}

export const LEVEL = new InjectionToken<number>("LEVEL");
export const CD_STRATEGY = new InjectionToken<ChangeDetectionStrategy>("CD_STRAT");

function isDirty(cdRef: ChangeDetectorRef): boolean {
  const flags = ((cdRef as any)._lView as LComponentView)[2];

  return getBit(flags, 5) === 1;
}

type LComponentView = [unknown, unknown, number, ...Array<unknown>];

function getBit(number: number, bitPosition: number): 1 | 0 {
  return (number & (1 << bitPosition)) === 0 ? 0 : 1;
}

function resolveChangeDetectionStrategyName(strategy: ChangeDetectionStrategy): string {
  return ChangeDetectionStrategy[strategy];
}

enum ChildType {
  ViewChild,
  ContentChild,
}

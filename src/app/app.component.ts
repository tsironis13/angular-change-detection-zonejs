import { ApplicationRef, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { Subject, takeUntil } from 'rxjs';
import { LEVEL } from './abstract-change-detection.component';
import { TreeModule } from './comp-tree/tree.module';
import { NumberHolder } from './number-holder';
import { DirtyCheckColoringService } from './services/dirty-check-coloring.service';
import { ExpandCollapseService, State } from './services/expand-collapse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    UnpatchModule,
    TreeModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
  ],
  providers: [{ provide: LEVEL, useValue: 1 }],
})
export class AppComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();

  private value = 0;
  protected inputByVal: number | undefined = undefined;
  protected inputByRef = new NumberHolder();
  protected inputObservable = new Subject<number>();

  @ViewChild('timeout_button', { static: true }) private _timeoutButton!: ElementRef;
  @ViewChild('clear', { static: true }) private _clearButton!: ElementRef;
  @ViewChild('auto_clear', { static: true }) private _autoClearCheckbox!: ElementRef<HTMLInputElement>;
  @ViewChild('toggle_content_children', { static: true }) private _toggleContentChildren!: ElementRef<HTMLElement>;
  @ViewChild('input_value_field', { static: true }) private _inputValueField!: ElementRef<HTMLElement>;

  @ViewChild('propagate_by_value_checkbox', { static: true })
  private _propagateByValueCheckbox!: ElementRef<HTMLInputElement>;

  @ViewChild('propagate_by_ref_checkbox', { static: true })
  private _propagateByRefCheckbox!: ElementRef<HTMLInputElement>;

  @ViewChild('propagate_by_observable_checkbox', { static: true })
  private _propagateByObservableCheckbox!: ElementRef<HTMLInputElement>;

  @ViewChild('propagate_in_zone_checkbox', { static: true })
  private _propagateInZoneCheckbox!: ElementRef<HTMLInputElement>;

  constructor(
    private _zone: NgZone,
    private _appRef: ApplicationRef,
    private _dirtyCheckColoringService: DirtyCheckColoringService,
    private _expandCollapseService: ExpandCollapseService
  ) {}
  ngOnInit(): void {
    this._dirtyCheckColoringService.setAutoClearColoring(this.isAutoClear());

    // Toggle ContentChildren
    this._expandCollapseService.contentChildren$.pipe(takeUntil(this._destroy$)).subscribe((state) => {
      const button = this._toggleContentChildren.nativeElement;
      button.innerHTML = state === State.Expand ? 'Collapse ContentChildren' : 'Expand ContentChildren';
    });

    // Busy
    this._dirtyCheckColoringService.busy$.pipe(takeUntil(this._destroy$)).subscribe((busy) => {
      if (busy && !this._dirtyCheckColoringService.isAutoClearColoring) {
        this._clearButton.nativeElement.classList.add('emphasize');
      } else {
        this._clearButton.nativeElement.classList.remove('emphasize');
      }
    });
  }

  clickNoop(): void {
    console.log(`click`);
  }

  onTickClick(): void {
    this._dirtyCheckColoringService.clearColoring();
    this._appRef.tick();
  }

  onTimeoutClick(): void {
    const timeout = 3000;

    // we want setTimeout to be patched and trigger a tick
    // eslint-disable-next-line @rx-angular/no-zone-critical-browser-apis
    setTimeout(() => console.log(`setTimeout(${timeout})`), timeout);
  }

  onClearClick(): void {
    this._dirtyCheckColoringService.clearColoring();
  }

  onTriggerChangeClick(): void {
    if (this.isPropagateInZone()) {
      // eslint-disable-next-line @rx-angular/no-zone-run-apis
      this._zone.run(() => this.updateInputValue());
    } else {
      this.updateInputValue();
    }
  }

  onAutoClearChange(event: Event) {
    this._dirtyCheckColoringService.setAutoClearColoring((event.target as HTMLInputElement).checked);
  }

  onToggleContentChildren() {
    this._expandCollapseService.toggleContentChildren();
  }

  ngOnDestroy(): void {
    this._destroy$.complete();
  }

  updateInputValue(): void {
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

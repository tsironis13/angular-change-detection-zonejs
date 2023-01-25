import { ApplicationRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LetModule } from '@rx-angular/template/let';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { of, Subject, takeUntil } from 'rxjs';
import { LEVEL } from './abstract-change-detection.component';
import { TreeModule } from './comp-tree/tree.module';
import { ExpandChildrenComponent } from './components/expand-children.component';
import { ToolbarComponent } from './components/toobar.component';
import { DisableWhenBusyDirective } from './disable.directive';
import { DirtyCheckColoringService } from './services/dirty-check-coloring.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TriggerChangeComponent } from './components/trigger-change.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    UnpatchModule,
    TreeModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    ToolbarComponent,
    LetModule,
    MatButtonModule,
    MatCheckboxModule,
    ExpandChildrenComponent,
    DisableWhenBusyDirective,
    TriggerChangeComponent,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  foo$ = of(1);

  private _destroy$ = new Subject<void>();

  @ViewChild('timeout_button', { static: true }) private _timeoutButton!: ElementRef;
  @ViewChild('clear', { static: true, read: ElementRef }) private _clearButton!: ElementRef;
  @ViewChild('auto_clear', { static: true }) private _autoClearCheckbox!: ElementRef<HTMLInputElement>;

  constructor(private _appRef: ApplicationRef, private _dirtyCheckColoringService: DirtyCheckColoringService) {}
  ngOnInit(): void {
    this._dirtyCheckColoringService.setAutoClearColoring(this.isAutoClear());

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
    setTimeout(() => {
      console.log(`setTimeout(${timeout})`);
      this._appRef.tick();
    }, timeout);
  }

  onClearClick(): void {
    this._dirtyCheckColoringService.clearColoring();
  }

  onAutoClearChange(event: Event) {
    this._dirtyCheckColoringService.setAutoClearColoring((event.target as HTMLInputElement).checked);
  }

  ngOnDestroy(): void {
    this._destroy$.complete();
  }

  private isAutoClear(): boolean {
    return this._autoClearCheckbox.nativeElement.checked;
  }
}

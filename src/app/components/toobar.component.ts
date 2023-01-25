import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, ViewChild } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { Destroy } from '../helpers/destroy';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, UnpatchModule],
  providers: [Destroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <mat-toolbar>
    <button
      mat-icon-button
      class="example-icon"
      aria-label="Example icon-button with menu icon"
      #toggleButton
      (click)="toggle()"
      [unpatch]
    >
      <mat-icon>menu</mat-icon>
    </button>
    <span>Angular Change Detection</span>
    <span class="example-spacer"></span>
    <!-- <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
        <mat-icon>favorite</mat-icon>
      </button>
      <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
        <mat-icon>share</mat-icon>
      </button> -->
  </mat-toolbar>`,
})
export class ToolbarComponent implements AfterViewInit {
  @Input() drawer!: MatDrawer;

  @ViewChild('toggleButton', { read: ElementRef }) button!: ElementRef<MatIconButton>;

  constructor(private zone: NgZone, private _destroy$: Destroy) {}

  ngAfterViewInit(): void {
    // console.log(this.button);
    // this.zone.runOutsideAngular(() => {
    //   fromEvent(this.button.nativeElement, 'click').pipe(
    //     takeUntil(this._destroy$),
    //     tap(() => this.drawer.toggle())
    //   );
    // });
  }

  toggle(): void {
    this.zone.run(() => {
      this.drawer.toggle();
    });
  }
}

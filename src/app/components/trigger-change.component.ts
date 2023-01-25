import { ChangeDetectionStrategy, Component, ElementRef, inject, NgZone, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { Subject } from 'rxjs';
import { NumberHolder } from '../number-holder';
import { ValueService } from '../services/value.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCheckboxModule, MatButtonModule, UnpatchModule],
  selector: 'app-trigger-change',
  template: ` <div>
      <mat-checkbox
        disableWhenBusy
        [unpatch]
        #propagate_by_value_checkbox
        checked
        title="Provides the new value as a new object (ref-change)"
      >
        Change value
      </mat-checkbox>
      <label>
        <input
          type="checkbox"
          disableWhenBusy
          #propagate_by_ref_checkbox
          checked
          title="Provides the new value by mutating the input object (no-ref-change)"
        />
        Mutate input object
      </label>
      <label>
        <input
          type="checkbox"
          disableWhenBusy
          #propagate_by_observable_checkbox
          checked
          title="Publishes the new value via Observable"
        />Observable emit
      </label>
    </div>
    <button mat-stroked-button [unpatch] (click)="onTriggerChangeClick()" disableWhenBusy>Trigger change</button>
    <label>
      <input type="checkbox" disableWhenBusy #propagate_in_zone_checkbox checked />
      Propagate in Angular zone
    </label>`,
})
export class TriggerChangeComponent {
  valueService = inject(ValueService);

  @ViewChild('input_value_field', { static: true }) private _inputValueField!: ElementRef<HTMLElement>;

  @ViewChild('propagate_by_value_checkbox', { static: true })
  private _propagateByValueCheckbox!: ElementRef<HTMLInputElement>;

  @ViewChild('propagate_by_ref_checkbox', { static: true })
  private _propagateByRefCheckbox!: ElementRef<HTMLInputElement>;

  @ViewChild('propagate_by_observable_checkbox', { static: true })
  private _propagateByObservableCheckbox!: ElementRef<HTMLInputElement>;

  @ViewChild('propagate_in_zone_checkbox', { static: true })
  private _propagateInZoneCheckbox!: ElementRef<HTMLInputElement>;
  constructor(private _zone: NgZone) {}

  onTriggerChangeClick(): void {
    if (this.isPropagateInZone()) {
      // eslint-disable-next-line @rx-angular/no-zone-run-apis
      this._zone.run(() => this.updateInputValue());
    } else {
      this.updateInputValue();
    }
  }

  updateInputValue(): void {
    this.valueService.value++;
    if (this.isPropagateByValue()) {
      this.valueService.inputByVal = this.valueService.value;
    }
    if (this.isPropagateByRef()) {
      this.valueService.inputByRef.value = this.valueService.value;
    }
    if (this.isPropagateByObservable()) {
      this.valueService.inputObservable.next(this.valueService.value);
    }

    // Update DOM directly because outside Angular zone to not trigger change detection
    this._inputValueField.nativeElement.innerHTML = this.valueService.value.toString(10);
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

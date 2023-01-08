import { ElementRef, inject, Injectable } from '@angular/core';
import { clearTimeout, setTimeout } from '@rx-angular/cdk/zone-less/browser';
import { DirtyCheckColoringService } from './dirty-check-coloring.service';

@Injectable()
export class ColorService {
  private ngDoCheckHandle!: number;
  private ngOnChangesHandle!: number;

  private _dirtyCheckColoringService = inject(DirtyCheckColoringService);

  public colorNgDoCheck(elementRef: ElementRef<HTMLElement>): void {
    clearTimeout(this.ngDoCheckHandle);
    this.ngDoCheckHandle = this.blink(elementRef.nativeElement, 'ng-do-check');
  }

  public colorNgOnChanges(elementRef: ElementRef<HTMLElement>): void {
    clearTimeout(this.ngOnChangesHandle);
    this.ngOnChangesHandle = this.blink(elementRef.nativeElement, 'ng-on-changes');
  }

  public colorDirtyCheck(elementRef: ElementRef): void {
    this._dirtyCheckColoringService.colorDirtyCheck(elementRef);
  }

  public colorChangeDetectorDetached(hostRef: ElementRef<HTMLElement>): void {
    hostRef.nativeElement.classList.add('cd-detached');
  }

  public colorChangeDetectorAttached(hostRef: ElementRef<HTMLElement>): void {
    hostRef.nativeElement.classList.remove('cd-detached');
  }

  private blink(element: HTMLElement, cssClass: string): any {
    element.classList.add(cssClass);
    return setTimeout(() => element.classList.remove(cssClass), 1500);
  }
}

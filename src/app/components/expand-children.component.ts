import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { takeUntil } from 'rxjs';
import { Destroy } from '../helpers/destroy';
import { ExpandCollapseService, State } from '../services/expand-collapse.service';

@Component({
  selector: 'app-expand-children',
  template: `<button
    mat-stroked-button
    #toggle_content_children
    [unpatch]
    (click)="onToggleContentChildren()"
  ></button>`,
  standalone: true,
  styles: ['button { font-size: 11px; }'],
  providers: [Destroy],
  imports: [MatButtonModule, UnpatchModule],
})
export class ExpandChildrenComponent implements OnInit {
  @ViewChild('toggle_content_children', { static: true, read: ElementRef })
  private _toggleContentChildren!: ElementRef<HTMLElement>;

  constructor(private _expandCollapseService: ExpandCollapseService, private _destroy$: Destroy) {}

  ngOnInit(): void {
    this._expandCollapseService.contentChildren$.pipe(takeUntil(this._destroy$)).subscribe((state) => {
      const button = this._toggleContentChildren.nativeElement.getElementsByClassName('mdc-button__label')[0];
      button.innerHTML = state === State.Expand ? 'Collapse ContentChildren' : 'Expand ContentChildren';
    });
  }

  onToggleContentChildren() {
    this._expandCollapseService.toggleContentChildren();
  }
}

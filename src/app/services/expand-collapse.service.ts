import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpandCollapseService {
  private _contentChildren$ = new BehaviorSubject<State>(State.Collapse);

  public toggleContentChildren(): void {
    this._contentChildren$.next(this._contentChildren$.getValue() === State.Expand ? State.Collapse : State.Expand);
  }

  public collapseContentChildren(): void {
    this._contentChildren$.next(State.Collapse);
  }

  public get contentChildren$(): Observable<State> {
    return this._contentChildren$.asObservable();
  }
}

export enum State {
  Expand,
  Collapse,
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NumberHolder } from '../number-holder';

@Injectable({ providedIn: 'root' })
export class ValueService {
  public value = 0;
  public inputByVal: number | undefined = undefined;
  public inputByRef = new NumberHolder();
  public inputObservable = new Subject<number>();
}

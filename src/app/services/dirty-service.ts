import { ChangeDetectorRef, Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class CheckDirtyService {
  private subject$ = new ReplaySubject<void>();
  public checkForDirty$: Observable<void> = this.subject$.asObservable();

  public markForCheck(cd: ChangeDetectorRef): void {
    cd.markForCheck();
    this.subject$.next();
  }
}

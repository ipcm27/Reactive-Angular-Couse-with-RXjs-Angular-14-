import { BehaviorSubject, Observable, of } from "rxjs";
import { tap, concatMap, finalize } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class LoadingService {
  // subsjects are like observable but emit values

  private loadingSubject = new BehaviorSubject<boolean>(false);

  // Eu torno o loadingSubject privado, so essa classe pode alterar e ao mesmo tempo
  // torno o loading$ inkado no subject
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoaderUntilComplete<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.loadingOn()),
      concatMap(() => obs$),
      finalize(() => this.loadingOff())
    );
  }

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
}

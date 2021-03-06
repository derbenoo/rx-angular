import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { defer, Observable } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';
import { BaseComponent } from '../../base.component.ts/base.component';
import { fromZoneEvent } from '@rx-angular/template';

@Component({
  selector: 'app-mixed-parent01',
  template: `
    <h2>
      Mixed Setup 01
      <small
        >One single-shot observable bound by one push and one rxLet as input
        binding</small
      >
    </h2>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    <span>strategy: </span><b class="strategy">{{ strategy }}</b>
    <br />
    <button #button>increment</button>
    <!-- -->
    <br />
    <ng-container *rxLet="value1$ as sync1">{{ sync1 }}</ng-container>
    <app-mixed-child01 [value]="value1$ | push: strategy"></app-mixed-child01>
  `,
  changeDetection: environment.changeDetection
})
export class Parent01Component extends BaseComponent {
  @ViewChild('button') button: ElementRef<HTMLButtonElement>;
  btnClick$ = defer(() => fromZoneEvent(this.button.nativeElement, 'click'));

  value1$: Observable<number> = this.btnClick$.pipe(
    startWith(0),
    scan((a): any => ++a, 0)
  );
}

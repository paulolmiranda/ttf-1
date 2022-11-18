import {
  Optional,
  SkipSelf,
  Component,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import produce from 'immer';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export interface Context {
  [key: string]: any;
}

export interface ContextProvider {
  dispatch: (key: string, value: any) => void;
  select(mapFn: (context: Context) => any): Observable<any>;
  value(): any;
}

@Component({
  selector: '[contextProvider]',
  templateUrl: './context-provider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ContextProviderComponent {
  public readonly contextProvider: ContextProvider;

  public readonly dispatch: BehaviorSubject<Context>;

  constructor(@Optional() @SkipSelf() private target: ChangeDetectorRef) {
    this.dispatch = new BehaviorSubject<Context>({});

    this.contextProvider = {
      dispatch: (key: string, value: any) => {
        const data = produce(this.dispatch.value, (draft: Context) => {
          draft[key] = value;
        });

        this.dispatch.next(data);
      },
      select: (mapFn: (context: Context) => any): Observable<any> => {
        return this.dispatch.pipe(map(mapFn), distinctUntilChanged());
      },
      value: () => this.dispatch.value
    };

    const component =
      (this.target as any)['_view']?.component ||
      (this.target as any)['context'];

    component['contextProvider'] = this.contextProvider;
  }
}

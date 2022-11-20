import {
  Input,
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

export interface ContextAction<P, T> {
  value: P;
  key: string;
  process?: (value: P, state: T) => T;
}

export interface Context {
  [key: string]: any;
}

export interface ContextProvider {
  dispatch: (data: ContextAction<any, any>) => void;
  select(mapFn: (context: Context) => any, params?: { distinctProperties?: string[] }): Observable<any>;
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

  @Input() set provide(provide: { [key: string]: any }) {
    Object.keys(provide || {}).forEach((key: string) => {
      this.contextProvider.dispatch({ key, value: provide[key] });
    });
  }

  constructor(@Optional() @SkipSelf() private target: ChangeDetectorRef) {
    this.provide = [];
    this.dispatch = new BehaviorSubject<Context>({});

    this.contextProvider = {
      dispatch: (action: ContextAction<any, any>) => {
        const context = produce(this.dispatch.value, (draft: Context) => {
          const { key, value, process } = action;
          const state = draft[key];

          draft[key] = (process && process(value, state)) || value;
        });

        this.dispatch.next(context);
      },
      select: (
        mapFn: (context: Context) => any,
        params?: { distinctProperties?: string[] }
      ): Observable<any> => {
        const { distinctProperties } = params || {};

        let distinctPipe = distinctUntilChanged();

        if (distinctProperties) {
          distinctPipe = distinctUntilChanged(
            (previous: any, current: any): boolean => {
              const check = distinctProperties.map(
                (key: string) => (previous || {})[key] === (current || {})[key]
              );
              return !check.includes(false);
            }
          );
        }

        return this.dispatch.pipe(map(mapFn), distinctPipe);
      },
      value: () => this.dispatch.value,
    };

    const component =
      (this.target as any)['_view']?.component ||
      (this.target as any)['context'];

    component['contextProvider'] = this.contextProvider;
  }
}

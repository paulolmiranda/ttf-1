import { ContextAction } from './context-provider/context-provider.component';

export * from './context.module';
export * from './context-provider/context-provider.component';
export * from './context-consumer/context-consumer.component';

export interface TypedAction<P, T> {
  (value: P): ContextAction<P, T>;
}

export const createAction = <P, T>(
  key: string,
  process: (value: P, state: T) => T
): TypedAction<P, T> => {
  return (value: P): ContextAction<P, T> => ({ key, value, process });
};

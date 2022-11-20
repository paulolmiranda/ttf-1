import { Message } from './app.component';
import { createAction } from './context';

export const addMessage = createAction<Message, Message[]>('messages',
  (value: Message, state: Message[]) => {
    return [...(state || []), value];
  }
);

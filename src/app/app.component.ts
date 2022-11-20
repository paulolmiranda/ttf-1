import { Component, OnInit } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { ContextProvider } from './context';

export type Sender = Development | ProductManager;

export interface Message {
  at: Date;
  to: string;
  sender: Sender;
  message: string;
}

export interface Development {
  id: string;
  name: string;
}

export interface ProductManager {
  id: string;
  name: string;
}

export interface Squad {
  id: string;
  description: string;
  productManager: ProductManager;
  developments: Array<Development>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  protected connect = true;

  protected readonly squads: Array<Squad>;

  private contextProvider?: ContextProvider;

  constructor() {
    this.squads = [];
  }

  ngOnInit(): void {
    // SOLUCTION DISTINCT BY PROPERTIES.
    this.contextProvider
      ?.select((context: any) => context.message, {
        distinctProperties: ['message'],
      })
      .subscribe((data: Message) => {
        console.log('distinct by messag', data);
      });

    this.contextProvider
      ?.select((context: any) => context.message, {
        distinctProperties: ['message', 'to'],
      })
      .subscribe((data: Message) => {
        console.log('distinct by messag and to', data);
      });

    this.squads.push({
      id: uuid(),
      description: 'Supremos',
      productManager: {
        id: uuid(),
        name: 'Levi Gonçalves',
      },
      developments: [
        {
          id: uuid(),
          name: 'Caio Moura',
        },
        {
          id: uuid(),
          name: 'Laura Lima',
        },
      ],
    });

    this.squads.push({
      id: uuid(),
      description: 'Fênix',
      productManager: {
        id: uuid(),
        name: 'Lorena Correia',
      },
      developments: [
        {
          id: uuid(),
          name: 'André da Conceição',
        },
        {
          id: uuid(),
          name: 'Diego das Neves',
        },
      ],
    });

    this.squads.push({
      id: uuid(),
      description: 'Frangos Fritos',
      productManager: {
        id: uuid(),
        name: 'Cauê Araújo',
      },
      developments: [
        {
          id: uuid(),
          name: 'Luiz Henrique Viana',
        },
        {
          id: uuid(),
          name: 'Danilo Fogaça',
        },
        {
          id: uuid(),
          name: 'Maysa Melo',
        },
        {
          id: uuid(),
          name: 'Pedro Lucas Barros',
        },
      ],
    });

    this.squads.push({
      id: uuid(),
      description: 'Time do Penta',
      productManager: {
        id: uuid(),
        name: 'Sarah da Cruz',
      },
      developments: [
        {
          id: uuid(),
          name: 'Joaquim da Conceição',
        },
      ],
    });
  }

  public onConnect(): void {
    this.connect = true;
  }

  public onDisconnect(): void {
    this.connect = false;
  }
}

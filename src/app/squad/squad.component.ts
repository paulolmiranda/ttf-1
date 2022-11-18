import { Component, Input } from '@angular/core';

import { Squad } from '../app.component';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.scss'],
})
export class SquadComponent {
  @Input() squad?: Squad;

  public onCopy(): void {
    const { id } = this.squad || {};
    navigator.clipboard.writeText(`${id}`);
  }
}

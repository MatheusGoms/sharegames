import { Component } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { GamerService } from '../services/gamer.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  protected quantPlayer: number = 0;
  protected quantGamer: number = 0;

  constructor(
    protected playerService: PlayerService,
    protected gamerService: GamerService,
  ) {
    this.playerService.gelAll().subscribe(
      res => {
        this.quantPlayer = res.length
      }
    )
    this.gamerService.gelAll().subscribe(
      res => {
        this.quantGamer = res.length
      }
    )
  }
}

import { GameService } from 'src/app/services/game.service';
import { Component } from '@angular/core';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  protected quantPlayer:number = 0;
  protected quantGame:number = 0;

  constructor(
    protected playerService: PlayerService,
    protected gameService: GameService,
  ) {
    this.playerService.gelAll().subscribe(
      res=>{
        this.quantPlayer = res.length
      }
    )
    this.gameService.gelAll().subscribe(
      res=>{
        this.quantGame = res.length
      }
    )

  }

}

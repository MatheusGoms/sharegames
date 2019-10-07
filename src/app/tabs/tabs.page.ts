import { Component } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  protected quantPlayer:number = 0;
  protected quantGames: number = 0;

  constructor(
    protected playerService: PlayerService,
    protected gameService: GameService
  ) {
    this.playerService.gelAll().subscribe(
      res=>{
        this.quantPlayer = res.length
      }
      
    )
    this.gameService.gelAll().subscribe(
      res=>{
        this.quantGames = res.length
      }
      
    )
  }

}

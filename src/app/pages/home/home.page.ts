import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  protected games: any;

  public foto:string = "https://picsum.photos/300/200";

  constructor(
    protected gameService: GameService
  ) { }

  ngOnInit() {
    this.gameService.gelAll().subscribe(
      res => {
        this.games = res;
      }
    )
  }


}

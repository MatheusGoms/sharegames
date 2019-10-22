import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  protected games: any;
  // public foto:string = "https://picsum.photos/300/200";

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 1,
    speed: 400
  };

  constructor(
    protected gameService: GameService
  ) { }

  ngOnInit() {
    this.gameService.getAll().subscribe(
      res => {
        this.games = res;
      }
    )
  }


}

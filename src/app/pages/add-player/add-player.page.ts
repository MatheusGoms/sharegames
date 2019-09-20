import { Component, OnInit } from '@angular/core';
import { Player } from '../../model/player';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.page.html',
  styleUrls: ['./add-player.page.scss'],
})
export class AddPlayerPage implements OnInit {

  protected player: Player = new Player;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-list-player',
  templateUrl: './list-player.page.html',
  styleUrls: ['./list-player.page.scss'],
})
export class ListPlayerPage implements OnInit {

  protected players: any;

  constructor(
    protected playerService: PlayerService
  ) { }

  ngOnInit() {
   this.playerService.getAll().subscribe(
     res=>{
       this.players = res;
     }
   )
    
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.playerService.getAll().subscribe(
      res => {
        this.players = res
        setTimeout(() => {
          console.log('Async operation has ended');
          event.target.complete();
        }, 0);
      }
    );
  }
}



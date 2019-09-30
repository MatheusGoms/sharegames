import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/model/player';
import { PlayerService } from 'src/app/services/player.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-player',
  templateUrl: './perfil-player.page.html',
  styleUrls: ['./perfil-player.page.scss'],
})
export class PerfilPlayerPage implements OnInit {

  protected player: Player = new Player;
  private id: string = null;

  constructor(
    protected playerService: PlayerService,
    protected activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id){
      this.playerService.get(this.id).subscribe(
        res=>{
          this.player = res
        }
      )
    }
  }

}

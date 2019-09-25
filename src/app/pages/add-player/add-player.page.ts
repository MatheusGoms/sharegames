import { Component, OnInit } from '@angular/core';
import { Player } from '../../model/player';
import { PlayerService } from '../../services/player.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.page.html',
  styleUrls: ['./add-player.page.scss'],
})
export class AddPlayerPage implements OnInit {

  protected player: Player = new Player;

  constructor(
  protected playerService:PlayerService,
  protected alertController: AlertController,
  protected router:Router
  ) { }
  ngOnInit() {
  }

  onsubmit(form){
    this.playerService.save(this.player).then(
      res=>{
        form.reset();
        this.player=new Player;
        //console.log("Cadastrado!");
        this.presentAlert("Aviso", "Cadastrado!");
        this.router.navigate(['/tabs/listPlayer']);
      },
      erro=>{
        console.log("Erro: " + erro);
        this.presentAlert("Erro", "Não foi possivel ser cadastrado");
      }
    )
  }

  //alerts...................................
  async presentAlert(tipo:string, texto:string) {
    const alert = await this.alertController.create({
      header: tipo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });

    await alert.present();
  }
}

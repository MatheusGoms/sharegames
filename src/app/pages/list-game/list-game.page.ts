import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.page.html',
  styleUrls: ['./list-game.page.scss'],
})

export class ListGamePage implements OnInit {

  protected games: any;

  constructor(
    protected gameService: GameService,
    protected router: Router,
    protected alertController: AlertController
  ) { }

  ngOnInit() {
    this.gameService.getAll().subscribe(
      res => {
        this.games = res;
      }
    )
  }

  editar(game) {
    this.router.navigate(['/tabs/addGame/', game.key])
  }

  async doRefresh(event) {
    //console.log('Begin async operation');
    this.gameService.getAll().subscribe(
      res => {
        this.games = res;
        setTimeout(() => {
          //console.log('Async operation has ended');
          event.target.complete();
        }, 500);
      }
    );
  }

  async apagar(game) {
    const alert = await this.alertController.create({
      header: 'Apagar dados!',
      message: 'Apagar todos os dados do game',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.gameService.remove(game).then(
              res => {
                this.presentAlert("Aviso", "Apagado com sucesso!");
                this.refreshGames();
              },
              erro => {
                this.presentAlert("Erro", "Ao apagar o item!");
              }
            )
          }
        }
      ]
    });
    await alert.present();
  }

  refreshGames() {
    this.gameService.getAll().subscribe(
      res => {
        this.games = res;
      }
    )
  }

  //Alerts-------------------
  async presentAlert(tipo: string, texto: string) {
    const alert = await this.alertController.create({
      header: tipo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });
    await alert.present();
  }
}

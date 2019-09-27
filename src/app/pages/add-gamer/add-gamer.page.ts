import { Component, OnInit } from '@angular/core';
import { Gamer } from 'src/app/model/gamer';
import { GamerService } from 'src/app/services/gamer.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-gamer',
  templateUrl: './add-gamer.page.html',
  styleUrls: ['./add-gamer.page.scss'],
})
export class AddGamerPage implements OnInit {

  protected gamer: Gamer = new Gamer;

  constructor(
    protected GamerService: GamerService,
    protected alertController: AlertController,
    protected router:Router
  ) { }

  ngOnInit() {
  }

  onsubmit(form) {
    this.GamerService.save(this.gamer).then(
      res => {
        form.reset();
        this.gamer = new Gamer;
        //+console.log("Cadastrado!");
        this.presentAlert("Aviso", "Cadastrado!")
        this.router.navigate(['/tabs/listGamer']);
      },
      erro => {
        console.log("Erro: " + erro);
        this.presentAlert("Erro", "Não foi possivel cadastrar!")
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

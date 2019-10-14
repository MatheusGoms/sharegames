import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MesagemService {

  constructor(
    protected alertController: AlertController,
    protected loadingController: LoadingController

  ) { }

  //Alerts -------------------
  async presentAlert(tipo: string, texto: string) {
    const alert = await this.alertController.create({
      header: tipo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });
    await alert.present();
  }

  //Loading -------------------
  async presentLoading() {
    await this.loadingController.create({
      spinner: "dots",
      message: 'Carregando...',
      //duration: 500
    }).then(
      res => {
        res.present()
      }
    )
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }
}

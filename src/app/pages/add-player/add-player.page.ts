import { Component, OnInit } from '@angular/core';
import { Player } from '../../model/player';
import { PlayerService } from '../../services/player.service';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.page.html',
  styleUrls: ['./add-player.page.scss'],
})
export class AddPlayerPage implements OnInit {

  protected player: Player = new Player;
  protected id: any = null;
  protected preview: any = null;

  constructor(
    protected playerService: PlayerService,
    protected alertController: AlertController,
    protected router: Router,
    private camera: Camera
  ) { }

  ngOnInit() {
  }

  onsubmit(form) {
    if (!this.preview) {
      this.presentAlert("Erro", "deve cadastrar ao menos uma foto!");
    } else
      if (this.id) {
        this.player.foto = this.preview;
        this.playerService.save(this.player).then(
          res => {
            form.reset();
            this.player = new Player;

            //  console.log("Cadastrado!");
            this.presentAlert("Aviso", "Cadastrado!");
            this.router.navigate(['/tabs/listPlayer']);
          },
          erro => {
            console.log("Erro: " + erro);
            this.presentAlert("Erro", "Não foi possível cadastrar!");

          }
        )
      }
  }
  tirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.preview = base64Image;
    }, (err) => {
      // Handle error
    });
  }
  // Alert 


  async presentAlert(tipo: string, texto: string) {
    const alert = await this.alertController.create({
      header: tipo,
      //  subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });

    await alert.present();
  }

}



import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/model/game';
import { GameService } from 'src/app/services/game.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.page.html',
  styleUrls: ['./add-game.page.scss'],
})
export class AddGamePage implements OnInit {

  protected game: Game = new Game;
  protected id: any = null;
  protected preview: string[] = null;
  protected posLat: number = 0;
  protected posLng: number = 0;

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 3,
    speed: 400
  };

  constructor(
    protected gameService: GameService,
    protected alertController: AlertController,
    protected activedRoute: ActivatedRoute,
    protected router: Router,
    private camera: Camera,
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.id = this.activedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.gameService.get(this.id).subscribe(
        res => {
          this.game = res
          this.preview = this.game.fotos
        },
        //erro => this.id = null
      )
    }
    //Localização atual
    this.localAtual()
  }

  onsubmit(form) {
    if (!this.preview) {
      this.presentAlert("Erro", "Deve inserir uma foto do perfil!");
    } else {
      this.game.fotos = this.preview;
      this.game.lat = this.posLat;
      this.game.lng = this.posLng;
      if (!this.id) {
        this.gameService.save(this.game).then(
          res => {
            form.reset();
            this.game = new Game;
            //console.log("Cadastrado!");
            this.preview = null
            this.presentAlert("Aviso", "Cadastrado!")
            this.router.navigate(['/tabs/perfilGame', res.id]);
          },
          erro => {
            console.log("Erro: " + erro);
            this.presentAlert("Erro", "Não foi possivel cadastrar!")
          }
        )
      } else {
        this.gameService.update(this.game, this.id).then(
          res => {
            form.reset();
            this.game = new Game;
            this.preview = null
            this.presentAlert("Aviso", "Atualizado!")
            this.router.navigate(['/tabs/perfilGame', this.id]);
          },
          erro => {
            console.log("Erro: " + erro);
            this.presentAlert("Erro", "Não foi possivel atualizar!")
          }
        )
      }
    }
  }

  tirarFoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      //this.preview = base64Image;
      //this.game.fotos.push(base64Image);

      if (this.preview == null)
        this.preview = []
      this.preview.push(base64Image);

    }, (err) => {
      // Handle error
    });
  }

  async removerFoto(index) {
    const alert = await this.alertController.create({
      header: 'Apagar foto!',
      message: 'Apagar foto do Game',
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
            this.preview.splice(index, 1);
          }
        }
      ]
    });
    await alert.present();
  }

  localAtual() {
    this.geolocation.getCurrentPosition().then(
      resp => {
        this.posLat = resp.coords.latitude;
        this.posLng = resp.coords.longitude;
      }).catch(
        error => {
          console.log('Não foi possivel pegar sua localização!', error);
        });
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

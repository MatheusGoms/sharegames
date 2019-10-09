import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/model/player';
import { PlayerService } from 'src/app/services/player.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.page.html',
  styleUrls: ['./add-player.page.scss'],
})
export class AddPlayerPage implements OnInit {
  
  protected player: Player = new Player;
  protected id: any = null;
  protected preview: any = null;
  protected posLat: number = 0;
  protected posLng: number = 0;

  constructor(
    protected playerService: PlayerService,
    protected alertController: AlertController,
    protected activedRoute: ActivatedRoute,
    protected router: Router,
    private camera: Camera,
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.id = this.activedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.playerService.get(this.id).subscribe(
        res => {
          this.player = res
          this.preview = this.player.foto
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
      this.player.foto = this.preview;
      this.player.lat = this.posLat;
      this.player.lng = this.posLng;

      if (!this.id) {
        this.playerService.save(this.player).then(
          res => {
            form.reset();
            this.player = new Player;
            //console.log("Cadastrado!");
            this.presentAlert("Aviso", "Cadastrado!")
            this.router.navigate(['/tabs/perfilPlayer', res.id]);
          },
          erro => {
            console.log("Erro: " + erro);
            this.presentAlert("Erro", "Não foi possivel cadastrar!")
          }
        )
      } else {
        this.playerService.update(this.player, this.id).then(
          res => {
            form.reset();
            this.player = new Player;
            this.presentAlert("Aviso", "Atualizado!")
            this.router.navigate(['/tabs/perfilPlayer', this.id]);
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

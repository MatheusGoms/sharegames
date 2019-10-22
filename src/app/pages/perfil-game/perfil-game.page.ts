import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/model/game';
import { GameService } from 'src/app/services/game.service';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  MarkerCluster,
  MyLocation,
  LocationService,
  Circle
} from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'app-perfil-game',
  templateUrl: './perfil-game.page.html',
  styleUrls: ['./perfil-game.page.scss'],
})
export class PerfilGamePage implements OnInit {

  protected game: Game = new Game;
  private id: string = null;
  protected map: GoogleMap;
  lat: number;
  lng: number;

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 3,
    speed: 400
  };

  constructor(
    protected gameService: GameService,
    protected playerService: PlayerService,
    protected activatedRoute: ActivatedRoute,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.gameService.get(this.id).subscribe(
        res => {
          this.game = res
          this.lng = res.lng
          this.lat = res.lat
          this.loadMap();
          this.minhaLocalizacao();
          this.colocarPlayer();
          console.log(this.lat, this.lng);
        }
      )
    }
  }

  //Google Maps -------------------------
  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      'camera': {
        'target': {
          "lat": this.lat,
          "lng": this.lng
        },
        'zoom': 15
      }
    });
    //this.addCluster(this.dummyData());
  }

  minhaLocalizacao() {
    //adicionar marcador no Mapa
    let marker: Marker = this.map.addMarkerSync({
      position: {
        lat: this.lat,
        lng: this.lng
      },
      icon: "#00ff00",
      title: "Titulo",
      snippet: "Comentário",

    })

    //Circulo
    this.map.addCircleSync({
      'center': { lat: this.lat, lng: this.lng },
      'radius': 300,
      'strokeColor': '#880000',
      'strokeWidth': 5,
      'fillColor': '#008800'
    });

    //adicionar eventos no mapa
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(
      res => {
        marker.setTitle(this.game.nome)
        marker.setSnippet(this.game.descricao)
        marker.showInfoWindow()
      }
    )
  }

  colocarPlayer() {
    this.playerService.getAll().subscribe(
      res => {
        res.forEach(p => {
          console.log(p);
          this.map.addMarker({
            position: {
              lat: p.lat,
              lng: p.lng
            }
          })
        })
      }
    )
  }
}


import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from '../model/player';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    protected fire: AngularFirestore
  ) { }

  save(player) {
    return this.fire.collection("players")
      .add({
        nome: player.nome,
        nickname: player.nickname,
        email: player.email,
        pws: player.pws,
        foto: player.foto,
        ativo: player.ativo,
        lat: player.lat,
        lng: player.lng
      });
  }

  gelAll() {
    return this.fire.collection("players").snapshotChanges()
      .pipe(
        map(dados =>
          dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
        )
      )
  }

  get(id) {
    return this.fire.collection("players").doc<Player>(id).valueChanges();
  }

  update(player: Player, id: string) {
    return this.fire.collection("players").doc<Player>(id)
      .update(player);
  }

  remove(player: any) {
    return this.fire.collection("players").doc(player.key).delete();
  }
}

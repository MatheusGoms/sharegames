import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from '../model/player';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    protected fire: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }

  save(player) {
    return this.afAuth.auth.createUserWithEmailAndPassword(player.email, player.pws)
      .then(
        res => {
          return this.fire.collection("players").doc(res.user.uid).set({
              nome: player.nome,
              nickname: player.nickname,
             //email: player.email,
             //pws: player.pws,
              foto: player.foto,
              ativo: player.ativo,
              lat: player.lat,
              lng: player.lng
            });
        }
      )

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

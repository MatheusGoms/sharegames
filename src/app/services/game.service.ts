import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Game } from '../model/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    protected fire: AngularFirestore
  ) { }

  save(game) {
    return this.fire.collection("games")
      .add({
        nome: game.nome,
        descricao: game.descricao,
        categoria: game.categoria,
        console: game.console,
        quant: game.quant,
        valor: game.valor,
        ativo: game.ativo
      });
  }

  gelAll() {
    return this.fire.collection("games").snapshotChanges()
      .pipe(
        map(dados =>
          dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
        )
      )
  }

  get(id) {
    return this.fire.collection("games").doc<Game>(id).valueChanges();
  }
}
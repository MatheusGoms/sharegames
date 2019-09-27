import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Gamer } from '../model/gamer';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GamerService {

  constructor(
    protected fire: AngularFirestore
  ) { }

  save(gamer) {
    return this.fire.collection("gamer")
      .add({
        nome: gamer.nome,
        categoria: gamer.categoria,
        console: gamer.console,
        descricao: gamer.descricao,
        quantidade: gamer.qtd,
        valor: gamer.valor,
        ativo: true
      });
  }

  gelAll() {
    return this.fire.collection("gamer").snapshotChanges()
      .pipe(
        map(dados =>
          dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
        )
      )
  }

  get(id){
    return this.fire.collection("gamer").doc<Gamer>(id).valueChanges();
  }
}

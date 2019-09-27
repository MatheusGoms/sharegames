import { Component, OnInit } from '@angular/core';
import { Gamer } from 'src/app/model/gamer';
import { GamerService } from 'src/app/services/gamer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-gamer',
  templateUrl: './perfil-gamer.page.html',
  styleUrls: ['./perfil-gamer.page.scss'],
})
export class PerfilGamerPage implements OnInit {

  protected gamer: Gamer = new Gamer;
  private id: string = null;

  constructor(
    protected GamerService: GamerService,
    protected activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id){
      this.GamerService.get(this.id).subscribe(
        res=>{
          this.gamer = res
        }
      )
    }
  }

}

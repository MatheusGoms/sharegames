import { Component, OnInit } from '@angular/core';
import { GamerService } from 'src/app/services/gamer.service';

@Component({
  selector: 'app-list-gamer',
  templateUrl: './list-gamer.page.html',
  styleUrls: ['./list-gamer.page.scss'],
})
export class ListGamerPage implements OnInit {

  protected gamer: any;

  constructor(
    protected gamerService: GamerService
  ) { }

  ngOnInit() {
    this.gamerService.gelAll().subscribe(
      res => {
        this.gamer = res;
      }
    )
  }

  async doRefresh(event) {
    //console.log('Begin async operation');
    this.gamerService.gelAll().subscribe(
      res => {
         this.gamer = res;
        setTimeout(() => {
          //console.log('Async operation has ended');
          event.target.complete();
        }, 500);
      }
    );
  }
}

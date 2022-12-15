import { Component } from '@angular/core';
import { Reservacion } from '../models/reservacion';
import { TranslateService } from '@ngx-translate/core';
import { ReservacionService } from '../services/reservacion.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  langs: string [] = [];


  public huespedes: Reservacion[] = [];
  public huesped: Reservacion =
    {
      codigo: "1234",
      nombre: "Dalia Esmeralda Palacios Flores",
      telefono: "3112567625",
      fechaIni: "26-Octubre-2022",
      fechaEgr: "31-Octubre-2022",
      habitacion: "1A",
      tokens: "111"
    }
  constructor(private translateService: TranslateService, private service: ReservacionService) {
    this.huesped = this.service.huesped;

    console.log('Uesped', this.huesped);
  }
  changeLang(event: any){
    this.translateService.use(event.detail.value);
    console.log(event.detail.value);
  }

}

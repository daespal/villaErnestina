import { Component } from '@angular/core';
import { Reservacion } from '../models/reservacion';
import { ReservacionService } from '../services/reservacion.service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public huesped: Reservacion;
  public botton : boolean;
  constructor(service:ReservacionService) {
    this.huesped = service.huesped;
    let fecha = new Date;
    if (this.huesped.fechaIni < fecha.toISOString() && this.huesped.fechaEgr > fecha.toISOString()){
      this.botton = false;
    }else{
      this.botton = true
    }
  }

}

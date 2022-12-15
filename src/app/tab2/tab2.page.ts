import { Component,ViewEncapsulation } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { IonicSlides } from '@ionic/angular';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);
import { TranslateService } from '@ngx-translate/core';
import { Reservacion } from '../models/reservacion';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Tab2Page {

  langs: string [] = [];
  public huespedes: Reservacion[] = [];
  url: string ="https://dof.gob.mx/nota_detalle.php?codigo=4706988&fecha=22/06/1994#gsc.tab=0";
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

  constructor(private translateService: TranslateService) {

  }
  changeLang(event){
    this.translateService.use(event.detail.value);
    console.log(event.detail.value);
  }

}

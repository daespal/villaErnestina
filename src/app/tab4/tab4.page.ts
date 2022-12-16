import { OnInit } from '@angular/core';
import { Component,ViewEncapsulation } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { IonicSlides } from '@ionic/angular';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);
import { Reservacion } from '../models/reservacion';
import { ReservacionService } from '../services/reservacion.service';



@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Tab4Page implements OnInit {

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
  constructor(private service: ReservacionService) { 
    this.huesped = service.huesped;
  }

  ngOnInit() {
    
  }

  //public video(){
    //this.videoPlayer.play('/assets/video/videoVillaErnestina.mp4').then(() => {
    ///  console.log('video completed');
    // }).catch(err => {
    //  console.log(err);
    // });
//  }

}

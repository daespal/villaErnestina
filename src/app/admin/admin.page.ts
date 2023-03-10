import { Reservacion } from './../models/reservacion';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReservacionService } from './../services/reservacion.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  public huesped: Reservacion[];

  public huespe: Reservacion;
  public ind: number = 0;
  public codigo: number = Math.random();
  public fecha: Date;

  url: string = "";
  constructor(private huespService: ReservacionService, private router: Router, private alertController: AlertController,
    private auth: AngularFireAuth) {
    this.huespService.getReservacion().subscribe(res => {
      this.huesped = res;
      console.log(this.huesped)
    });
    this.url = this.huespService.setWats();
  }

  public removeReservation(pos: string) {
    this.huespService.removeReservation(pos);

  }
  logut() {
    //this.auth.signOut();
    this.router.navigate([''])
  }


  public mensajeWhats(tel: string): void {

    const url = "https://api.whatsapp.com/send?phone=52" + tel + "&text=" +
      "Gracias por tu reservación, puede consultar mas información en el siguiente enlace: https://villaernestinap.web.app Tu token es: ";
    window.open(url, '_system', 'location=yes');
  }

  public tokenWhats(tel: string, token: string): void {
    const toke = "https://api.whatsapp.com/send?phone=52" + tel + "&text=" + token;
    window.open(toke, '_system', 'location=yes');
  }


  public getReservacionById(id: string) {
    this.router.navigate(['/view-huesped'], {
      queryParams: { id: id },
    })
  }
  async presentAlert(id: string) {
    const alert = await this.alertController.create({
      header: '¿Quiere borrar un huesped de la lista?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {

            this.removeReservation(id);

          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

  }

  public getRandomIntegerBetweenRange(min: number, max: number): number {
    let x: number;
    x = (Math.random() * ((max - min) + 1)) + min;
    return x;
  }

  getHabitacion(): any {
    //regresa el numero de habitacion registrado
    let nHab = '';
    for (let i = 0; i < this.huesped.length; i++) {
      nHab = this.huesped[i].habitacion.valueOf();
      return nHab;
    }
    return null;
  }

  public addHuesped() {
    this.router.navigate(['/new-reservacion'])
  }

  ngOnInit() {
    return;
  }




  async alertErrorFecha() {
    const alert = await this.alertController.create({
      header: 'Existe un error con la fecha, debe de ser mayor a la de ingreso',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }

  async alertErrorHabitacion() {
    const alert = await this.alertController.create({
      header: 'Existe un error con la habitacion, ya esta ocupada esos dias',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }

  public ordenar() {
    this.huespService.getReservacion().subscribe(resp => {
      this.huesped = resp;

      this.huesped.forEach(a => {
        this.fecha = new Date(a.fechaIni)
        this.huesped.sort((a, b) => new Date(a.fechaIni).getTime() - new Date(b.fechaIni).getTime());

      });
    });
  }


  public normal() {
    this.huespService.getReservacion().subscribe(resp => {
      this.huesped = resp;
      this.huesped.forEach(a => {
        this.fecha = new Date(a.fechaIni)
        this.huesped.sort((a, b) => new Date(b.fechaIni).getTime() - new Date(a.fechaIni).getTime());

      });
    });
  }

  public leon() {
    this.huespService.getReservacionLeon().subscribe(resp => {
      this.huesped = resp;
      this.huesped.forEach(a => {
        this.fecha = new Date(a.fechaIni)
        this.huesped.sort((a, b) => new Date(a.fechaIni).getTime() - new Date(b.fechaIni).getTime());

      });
    });
  }

  public elefante() {
    this.huespService.getReservacionElefante().subscribe(resp => {
      this.huesped = resp;
      this.huesped.forEach(a => {
        this.fecha = new Date(a.fechaIni)
        this.huesped.sort((a, b) => new Date(a.fechaIni).getTime() - new Date(b.fechaIni).getTime());

      });
    });
  }

  public color(col: string) {
    let color = "";
    if (col === "Elefante") {
      color = "warning";
    } else {
      color = "secondary";
    }
    return color;
  }
}

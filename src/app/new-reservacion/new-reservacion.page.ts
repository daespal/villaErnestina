import { Reservacion } from './../models/reservacion';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReservacionService } from './../services/reservacion.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-reservacion',
  templateUrl: './new-reservacion.page.html',
  styleUrls: ['./new-reservacion.page.scss'],
})
export class NewReservacionPage implements OnInit {

  public reservacion: Reservacion;
  public myForm: FormGroup;
  public validationMessages: object;
  myDate: String = new Date().toISOString();
  myDate2: String = new Date().toISOString();
  today: String = new Date().toISOString();
  today2: String = new Date().toISOString();
  public fecha = new Date();
  random:string;

  constructor(private reservaservices:ReservacionService,private fb: FormBuilder, private navCtrl: NavController, private router: Router, private alertController: AlertController) {
    this.random=this.getRandomIntegerBetweenRange(1000, 10000).toString();
   }

  ngOnInit() {
    this.myForm = this.fb.group({
      codigo:[this.random, Validators.required],
      nombre:["", Validators.required],
      telefono:["", Validators.required],
      fechaIni:["", Validators.required],
      fechaEgr:["", Validators.required],
      habitacion:["", Validators.required],
      tokens:["", Validators.compose([Validators.required])]
    });

    this.validationMessages = {
      'codigo': [
        { type: 'required', message: "Debe capturar el codigo"}
      ],
      'nombre': [
        { type: 'required', message: "Debe capturar el nombre"}
      ],
      'telefono': [
        { type: 'required', message: "Debe capturar el numero de telefono"},
       
      ],
      'fechaIni': [
        { type: 'required', message: "Debe capturar la fecha de inicio"},
        
      ],
      'fechaFin': [
        { type: 'required', message: "Debe capturar la fecha de fin"},
        
      ],
      'habitacion': [
        { type: 'required', message: "Debe capturar la habitacion"},
        
      ],
      'tokens': [
        { type: 'required', message: "Debe capturar el token"}
      ],
    }
  }

  public getRandomIntegerBetweenRange(min: number, max: number): number {
    let x: number;
    x = (Math.random() * ((max - min) + 1)) + min;
    return x;
  }

  public newReservacion() {
    this.reservacion = {
      codigo:this.myForm.controls.codigo.value,
      nombre:this.myForm.controls.nombre.value,
      telefono:this.myForm.controls.telefono.value,
      fechaIni:this.myForm.controls.fechaIni.value,
      fechaEgr:this.myForm.controls.fechaEgr.value,
      habitacion:this.myForm.controls.habitacion.value,
      tokens:this.myForm.controls.tokens.value,
    }
    this.reservaservices.addHuesped(this.reservacion); 

    if(this.myForm.controls.habitacion.value=="Leon"){
      this.reservaservices.addLeon(this.reservacion); 
    }else{
      this.reservaservices.addElefante(this.reservacion); 
    }
    
   
  }

  public async saveReservacion() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas guardar la reservacion?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
           
              this.newReservacion();
              this.back()
            
          
          }
         
        }
      ]
    });
    
    await alert.present();



  }

  back():void{
    this.router.navigateByUrl('')
  }

  async alertErrorFecha() {
    const alert = await this.alertController.create({
      header: 'Existe un error con la fecha, la fecha de salida debe de ser mayor a la de ingreso',
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

  public validarFecha(){
    const fecha=this.myForm.controls.fechaIni.value;
    const fecha2=this.myForm.controls.fechaEgr.value;
    if(fecha.localeCompare(fecha2)==0){
      this.alertErrorFecha();
    }else{
      this.saveReservacion();
    }
  }

}

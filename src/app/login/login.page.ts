import { Administrador } from './../models/administrador';
import { Reservacion } from './../models/reservacion';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ReservacionService } from '../services/reservacion.service';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  public admi:Administrador[];
  public usuario:Reservacion[];
  public huesped:Reservacion[];
  public myForm: FormGroup;
  public codigo:string="";

  credenciales  = {
    ingreso: null
  }


  constructor(private router: Router,private alertController: AlertController, 
    private service:ReservacionService, private fb: FormBuilder, private navCtrl: NavController) {
      this.service.getReservacion().subscribe(res => {
        this.huesped = res;
        console.log(this.huesped)
      });
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      codigo: ["",Validators.required]
    })
  }
  async loginPrueba (){
    this.service.huespedes = this.huesped;
    this.huesped.forEach(item=>{
      this.service.codigoAdm.push(item.codigo)
    });
    this.service.validarToken(this.myForm.get('codigo').value);
    this.service.getHuespedByCodigo(this.myForm.get('codigo').value)
  }
  public buscarUsuario(){
    this.codigo = this.myForm.controls.codigo.value;
  
    console.log(this.codigo);
    
    this.service.getAdmin().subscribe(res => {
      this.admi = res;
      console.log(this.admi)
      this.admi.forEach(i=>{

        if (i.codigo.localeCompare(this.codigo)==0 ){
          console.log("si existe")
          this.ingresarAdmi();
          //your awesome code here
        } else {
          this.buscarHost()
          console.log("no existe");
                    
          //your awesome code here
        }  
    });

    });

   
  }


  public buscarHost(){
    this.service.getReservacion().subscribe(res => {
      this.usuario = res;
      console.log(this.usuario)
      this.usuario.forEach(i=>{

        if (i.codigo.localeCompare(this.codigo)==0 ){
          console.log("si existe")
          this.ingresarHost();
          this.getUsuarioByCodigo(this.codigo);
          //your awesome code here
        } else {
          console.log("no existe");
          //your awesome code here
        }  
    });
  });
  }

  public ingresarAdmi(){
    this.router.navigate(['admin'])
  }

  public ingresarHost(){
    this.router.navigate(['tabs/tab1'])
  }

 

  public getUsuarioByCodigo(codigo:string){
    this.router.navigate(['tabs/tab1'],{
      queryParams: {codigo:codigo}
     
    });
    console.log(this.codigo);
  }

}

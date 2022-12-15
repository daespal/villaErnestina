
import { Injectable } from '@angular/core';
import { Administrador } from './../models/administrador';
import { Reservacion } from '../models/reservacion';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';




@Injectable({
  providedIn: 'root'
})
export class ReservacionService {
  public huespedes: Reservacion[];

  public codigoAdm = ['admin'];
  public codigo = '';
  constructor(private firestore: AngularFirestore, private authFirebase: AngularFireAuth, private router:Router) { }

  validarToken(token: string){
    if (token === this.codigoAdm[0]){
      this.router.navigate(['/list-host']);
    }else if(this.codigoAdm.includes(token)){
      let navigation: NavigationExtras = {
        state:{
          codigoAdm: token
        }
      }
      this.router.navigate(['/tap-huesped/view-huesp'], navigation)
    }

  }

  public getHuespedByCodigo(token: string){
    this.huespedes.forEach(item =>{
      if(item.codigo === token){
        this.huesped = item;
      }
    })
  }
  public getReservacion(): Observable<Reservacion[]> {
    return this.firestore.collection('Reservacion').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          console.log(a);
          const data = a.payload.doc.data() as Reservacion;
          console.log(data);
          const id = a.payload.doc.id;
          return { id, ...data }
        });
      })
    );
  }
  public getAdmin(): Observable<Administrador[]> {
    return this.firestore.collection('Administrador').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          console.log(a);
          const data = a.payload.doc.data() as Administrador;
          console.log(data);
          const id = a.payload.doc.id;
          return { id, ...data }
        });
      })
    );
  }
}

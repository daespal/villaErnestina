import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComoLlegarPageRoutingModule } from './como-llegar-routing.module';

import { ComoLlegarPage } from './como-llegar.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComoLlegarPageRoutingModule,
    TranslateModule
  ],
  declarations: [ComoLlegarPage]
})
export class ComoLlegarPageModule {}

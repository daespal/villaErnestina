import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeInteresPageRoutingModule } from './de-interes-routing.module';

import { DeInteresPage } from './de-interes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeInteresPageRoutingModule,
    TranslateModule
  ],
  declarations: [DeInteresPage]
})
export class DeInteresPageModule {}

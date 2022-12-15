import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeInteresPage } from './de-interes.page';

const routes: Routes = [
  {
    path: '',
    component: DeInteresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeInteresPageRoutingModule {}

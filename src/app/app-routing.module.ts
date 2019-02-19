import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'aboutus',
    loadChildren: './aboutus/aboutus.module#AboutusModule'
  },
  {
    path: '',
    loadChildren: './unit/unit.module#UnitModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

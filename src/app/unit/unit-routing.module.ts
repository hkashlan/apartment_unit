import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitDetailComponent } from './unit-detail/unit-detail.component';
import { UnitResolveService } from './shared/unit.resolve.service';

const routes: Routes = [
  {
    path: 'list',
    component: UnitListComponent,
    resolve: { units: UnitResolveService }
  },
  {
    path: 'detail/:id',
    component: UnitDetailComponent,
    resolve: { units: UnitResolveService }
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitRoutingModule {}

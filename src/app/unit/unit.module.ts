import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitRoutingModule } from './unit-routing.module';
import { UnitListComponent } from './unit-list/unit-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnitDetailComponent } from './unit-detail/unit-detail.component';
import { UnitComponent } from './unit/unit.component';

@NgModule({
  declarations: [UnitListComponent, UnitDetailComponent, UnitComponent],
  imports: [
    CommonModule,
    UnitRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class UnitModule {}

import { UnitsModel } from './units.model';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { UnitService } from './unit.service';

@Injectable({
  providedIn: 'root'
})
export class UnitResolveService implements Resolve<UnitsModel> {
  constructor(private unitService: UnitService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UnitsModel> | Promise<UnitsModel> | any {
    return this.unitService.fetchUnits();
  }
}

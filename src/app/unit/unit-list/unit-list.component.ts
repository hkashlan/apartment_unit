import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, merge } from 'rxjs';
import {
  startWith,
  map,
  debounceTime,
  mergeMap,
  distinctUntilChanged,
} from 'rxjs/operators';
import { UnitService } from '../shared/unit.service';
import { UnitsModel } from '../shared/units.model';
import { UnitModel } from '../shared/unit.model';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {
  cityControl = new FormControl('');
  neighborhoodControl = new FormControl('');

  cityOptions: Observable<string[]>;
  neighborhoodOptions: Observable<string[]>;
  unitsModel: Observable<UnitsModel>;
  unitsList: Observable<UnitModel[]>;

  constructor(public unitService: UnitService) {}

  ngOnInit() {
    this.neighborhoodOptions = this.createStream(this.neighborhoodControl, 'neighborhood');

    this.cityOptions = this.createStream(this.cityControl, 'city');

    this.unitsList = merge(this.cityOptions, this.neighborhoodOptions).pipe(
      mergeMap(() =>
        this.unitService.unitsModel.pipe(
          map(units => this._filterUnits(units.data))
        )
      )
    );
  }

  private createStream(control: FormControl, property: string) {
    return control.valueChanges.pipe(
      startWith(''),
      debounceTime(100),
      distinctUntilChanged(),
      mergeMap(value =>
        this.unitService.unitsModel.pipe(
          map(unitsModel => this._filter(unitsModel.data, value, property)),
        )
      )
    );
  }

  private _filter(data: UnitModel[], value: string, key: string): string[] {
    const filterValue = value.toLowerCase();

    let keyValues = data.map(unit => unit.address[key]);
    keyValues = keyValues.filter((v, i) => v && keyValues.indexOf(v) === i);
    return keyValues
      .filter(element => element.toLowerCase().includes(filterValue))
      .sort();
  }

  private _filterUnits(data: UnitModel[]): UnitModel[] {
    return data.filter(
      unit =>
        this.includes(this.cityControl.value, unit.address.city) &&
        this.includes(this.neighborhoodControl.value, unit.address.neighborhood)
    );
  }

  private includes(val1: string, val2: string) {
    return val2 && val2.toLowerCase().includes(val1.toLowerCase());
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, pipe, of } from 'rxjs';
import {
  startWith,
  map,
  debounceTime,
  switchMap,
  filter,
  flatMap,
  groupBy,
  toArray,
  mergeMap,
  combineLatest,
  catchError,
  distinctUntilChanged,
  mergeAll,
  tap,
  merge,
  combineAll,
  zip,
  concat,
  concatAll
} from 'rxjs/operators';
import { UnitService } from '../shared/unit.service';
import { UnitsModel } from '../shared/units.model';
import { UnitModel } from '../shared/unit.model';
import { from } from 'zen-observable';
import { Router } from '@angular/router';

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

  constructor(public unitService: UnitService, private router: Router) {}

  ngOnInit() {
    this.neighborhoodOptions = this.neighborhoodControl.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      startWith(''),
      map(value => value.toLowerCase()),
      mergeMap(value =>
        this.unitService.unitsModel.pipe(
          map(unitsModel => unitsModel.data),
          map(data => this._filter(data, value, 'neighborhood')),
          tap(d => console.log(d))
        )
      )
    );

    this.cityOptions = this.cityControl.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      startWith(''),
      map(value => value.toLowerCase()),
      mergeMap(value =>
        this.unitService.unitsModel.pipe(
          map(unitsModel => unitsModel.data),
          map(data => this._filter(data, value, 'city')),
          tap(d => console.log(d))
        )
      )
    );

    this.unitsList = this.cityOptions.pipe(
      merge(this.neighborhoodOptions),
      mergeMap(value1 =>
        this.unitService.unitsModel.pipe(
          map(value => value.data),
          map(unit => this._filterUnits(unit))
        )
      )
    );

    // tt

    // this.filteredOptions = this.cityControl.valueChanges.pipe(
    //   debounceTime(100),
    //   distinctUntilChanged(),
    //   startWith(''),
    //   map(value => value.toLowerCase()),
    //   mergeMap(value =>
    //     this.unitService.unitsModel.pipe(
    //       map(unitsModel => of(unitsModel.data)),
    //       mergeAll(),
    //       flatMap(unit => unit),
    //       groupBy(unit => unit.address.city.toLowerCase().trim()),
    //       // tap(d => console.log(d.key)),
    //       map(group => group.key),
    //       filter(city => city.toLowerCase().includes(value)),
    //       zip()
    //       // tap(d => console.log('1' + d))
    //       // zip()
    //       // concatAll()
    //     )
    //   )
    // );
    // tt.subscribe(data => console.log(data));
  }

  private _filter(data: UnitModel[], value: string, key: string): string[] {
    const filterValue = value.toLowerCase();

    let cities = data.map(unit => unit.address[key]);
    cities = cities.filter((v, i) => v && cities.indexOf(v) === i);
    return cities
      .filter(city => city.toLowerCase().includes(filterValue))
      .sort();
  }

  private _filterUnits(data: UnitModel[]): UnitModel[] {
    return data.filter(
      unit =>
        unit.address.city
          .toLowerCase()
          .includes(this.cityControl.value.toLowerCase()) &&
        unit.address.neighborhood &&
        unit.address.neighborhood
          .toLowerCase()
          .includes(this.neighborhoodControl.value.toLowerCase())
    );
  }

  goTo(unitModel: UnitModel) {
    this.router.navigate([`/detail/${unitModel.id}`]);
  }
}

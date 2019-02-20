import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { UnitService } from '../shared/unit.service';
import { UnitsModel } from '../shared/units.model';
import { UnitModel } from '../shared/unit.model';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  unitsModel: Observable<UnitsModel>;
  unitsList: Observable<UnitModel[]>;
  tt: UnitModel[];

  constructor(public unitService: UnitService) {
    // unitService.unitsModel.
    // this.unitsModel = unitService.su
    this.unitsList = this.unitService.unitsModel.pipe(map(value => value.data));
    this.unitService.unitsModel.subscribe(d => {
      this.tt = d.data;
    });
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
}

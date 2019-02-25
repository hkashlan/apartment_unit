import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { UnitModel } from '../shared/unit.model';
import { UnitService } from '../shared/unit.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.css']
})
export class UnitDetailComponent implements OnInit {
  unit: Observable<UnitModel>;

  constructor(
    private route: ActivatedRoute,
    private unitService: UnitService
  ) {}

  ngOnInit() {
    this.unit = this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id =>
        this.unitService.unitsModel.pipe(
          map(unitsModel => unitsModel.data),
          map(units => units.find(unit => unit.id === id)),
        )
      )
    );
  }
}

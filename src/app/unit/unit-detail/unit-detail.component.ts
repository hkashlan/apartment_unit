import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap, map, filter, flatMap, first } from 'rxjs/operators';
import { UnitModel } from '../shared/unit.model';
import { UnitService } from '../shared/unit.service';
import { of, from, Observable } from 'rxjs';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.css']
})
export class UnitDetailComponent implements OnInit {
  unit: Observable<UnitModel>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unitService: UnitService
  ) {}

  ngOnInit() {
    this.unit = this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id =>
        this.unitService.unitsModel.pipe(
          map(unitsModel => from(unitsModel.data)),
          flatMap(units => units),
          filter(unit => unit.id === id),
          first()
        )
      )
    );
  }
}

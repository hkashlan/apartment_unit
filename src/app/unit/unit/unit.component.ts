import { Component, OnInit, Input } from '@angular/core';
import { UnitModel } from '../shared/unit.model';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  @Input() unitModel: UnitModel;

  constructor() {}

  ngOnInit() {}

  goToDetail() {
    console.log('hi');
  }

  getAddress() {
    const address = this.unitModel.address;
    return `${address.streetName}
      ${address.houseNumber} ${address.postalCode} ${address.city}
      ${address.neighborhood}
      `;
  }
}

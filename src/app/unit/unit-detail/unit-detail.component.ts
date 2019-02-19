import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.css']
})
export class UnitDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => {
    //     // this.service.getHero(params.get('id')))
    //     console.log('1');
    //   })
    // );
  }

  ngOnInit() {}
}

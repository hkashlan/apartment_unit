import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { UnitsModel } from './units.model';
import { unitsData } from './graphql/unit.graphql';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  serverName: string;
  cacheServerName: string;
  unitsModel: Subject<UnitsModel> = new BehaviorSubject(null);

  constructor(private apollo: Apollo) {}

  fetchUnits(): void {
    return Observable.create(observer => {
      this.apollo
        .query<any>({
          query: unitsData,
          fetchPolicy: 'network-only'
        })
        .pipe(
          map(result => {
            if (!result.loading) {
              this.unitsModel.next(result.data.unitsData);
              observer.next(result.data.unitsData);
              observer.complete();
              // this.serverName = result.data.serverData.name;
              // this.cacheServerName = this.serverName;
            }
          })
        )
        .subscribe();
    });
  }
}

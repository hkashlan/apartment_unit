import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';
import { ApolloLink } from 'apollo-link';

const uri = ''; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache()
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  constructor(apollo: Apollo) {
    const cache = new InMemoryCache();

    const restLink = new RestLink({
      uri: ' https://let-api-test.akelius.com/api/',
      credentials: 'same-origin',
      typePatcher: {
        UnitsModel: (
          data: any,
          outerType: string,
          patchDeeper: RestLink.FunctionalTypePatcher
        ): any => {
          data.__typename = 'UnitsModel';
          if (data.data != null) {
            data.data = data.data.map(d => {
              d.__typename = 'UnitModel';
              d.address.__typename = 'UnitAddress';
              d.details.__typename = 'UnitDetail';
              return d;
            });
          }
          return data;
        }
        /* … other nested type patchers … */
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    apollo.create({
      link: ApolloLink.from([restLink]),
      cache: cache
    });
  }
}

import gql from 'graphql-tag';

export const unitsData = gql `
    query unitsData {
        unitsData @rest(type: "UnitsModel", path: "v1/de/marketing/units") {
          totalElements
          data {
            address {
              city
              houseNumber
              neighborhood
              streetName
              postalCode
            }
            details {
              numberOfRooms
              size
            }
            id
            teaserImageUrl
            title

          }
        }
    }
`;

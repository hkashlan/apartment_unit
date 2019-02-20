export class UnitModel {
  address: UnitAddress;
  details: UnitDetail;
  id: string;
  teaserImageUrl: string;
  title: string;
}

export class UnitAddress {
  city: string;
  houseNumber: string;
  neighborhood: string;
  streetName: string;
  postalCode: string;
}

export class UnitDetail {
  numberOfRooms: number;
  size: number;
}

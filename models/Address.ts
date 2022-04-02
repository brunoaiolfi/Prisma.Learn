import { City } from "./City";

export type Address = {
  id: Number;
  zip: String;
  number: Number;
  complement: String;

  cityId: Number;
  city: City;
};

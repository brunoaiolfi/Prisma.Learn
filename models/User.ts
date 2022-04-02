import { Address } from "./Address";
import { StatusEnum } from "./Enums/Status";

export type User = {
  id: Number;
  name: string;

  email: string;
  password: string;

  whatsappNumber: Number;

  birthYear: Number;

  addressId: Number;

  address: Address;

  status: StatusEnum;

  updated_at: Date;
};

import { State } from "./State";

export type City = {
  id: Number;
  name: String;

  stateId: Number;
  state: State;
};

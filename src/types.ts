import { Accessor, Setter } from "solid-js";

export interface Dice {
  value: number;
  freezed: Accessor<boolean>;
  setFreezed: Setter<boolean>;
}

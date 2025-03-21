import { JSX } from "react";

export interface Card {
  [key: string]: any;
}

export interface TabProps {
  label: string;
  cards: Card[];
}

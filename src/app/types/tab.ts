import { JSX } from "react";

export interface Card {
  [key: string]: string | number | JSX.Element | undefined | null;
}

export interface TabProps {
  label: string;
  cards: Card[];
}

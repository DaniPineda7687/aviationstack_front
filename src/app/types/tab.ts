export interface Card {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface TabProps {
  label: string;
  cards: Card[];
}

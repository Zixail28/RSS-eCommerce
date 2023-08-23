export interface FiltersItem {
  brand: string;
  color: string;
  availability: string;
  discountToDay: boolean;
}

export enum StateSort {
  none,
  ascending,
  descending,
}

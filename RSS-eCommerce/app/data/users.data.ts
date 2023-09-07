type Category = {
  id: number;
  name: string;
};

export type FiltItem = {
  brand: string[];
  color: string[];
  availability: string[];
  discountToDay: boolean;
};

export type ProductItem = {
  id: string;
  images: string[];
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  price: number;
  priceOld: number;
  filter: FiltItem;
};

export let productsListServer: ProductItem[] = [];
export const setProductsServer = (newProductsList: ProductItem[]) => {
  productsListServer = newProductsList;
};

export let categoriesServer: Category[] = [];
export const setCategoriesServer = (newCategories: Category[]) => {
  categoriesServer = newCategories;
};

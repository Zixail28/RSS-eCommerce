export interface ISearchProductsResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: ISearchProduct[];
  facets: Facets;
}

export interface Facets {}

export interface ISearchProduct {
  id: string;
  version: number;
  productType: ProductType;
  name: Description;
  description: Description;
  categories: ProductType[];
  categoryOrderHints: Facets;
  slug: Description;
  metaTitle: Meta;
  metaDescription: Meta;
  //variants:           any[];
  masterVariant: MasterVariant;
  searchKeywords: Facets;
  hasStagedChanges: boolean;
  published: boolean;
  priceMode: string;
  createdAt: Date;
  lastModifiedAt: Date;
}

export interface ProductType {
  typeId: string;
  id: string;
}

export interface Description {
  "en-US": string;
}

export interface MasterVariant {
  //attributes: any[];
  //assets:     any[];
  images: Image[];
  prices: Price[];
  key: string;
  sku: string;
  id: number;
}

export interface Image {
  url: string;
  dimensions: Dimensions;
}

export interface Dimensions {
  w: number;
  h: number;
}

export interface Price {
  id: string;
  value: Value;
  key: string;
  discounted: Discounted;
}

export interface Discounted {
  value: Value;
  discount: ProductType;
}

export interface Value {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface Meta {
  "en-US": string;
  "ru-RU": string;
}

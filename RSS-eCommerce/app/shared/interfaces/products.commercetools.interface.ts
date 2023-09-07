export interface IProduct {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: LastModifiedBy;
  createdBy: CreatedBy;
  productType: ProductType;
  masterData: MasterData;
  priceMode: string;
  lastVariantId: number;
}

export interface LastModifiedBy {
  isPlatformClient: boolean;
  user: User;
}

export interface User {
  typeId: string;
  id: string;
}

export interface CreatedBy {
  isPlatformClient: boolean;
  user: User2;
}

export interface User2 {
  typeId: string;
  id: string;
}

export interface ProductType {
  typeId: string;
  id: string;
}

export interface MasterData {
  current: Current;
  staged: Staged;
  published: boolean;
  hasStagedChanges: boolean;
}

export interface Current {
  name: Name;
  description: Description;
  categories: Category[];
  categoryOrderHints: CategoryOrderHints;
  slug: Slug;
  metaTitle: MetaTitle;
  metaDescription: MetaDescription;
  masterVariant: MasterVariant;
  //variants: any[]
  searchKeywords: SearchKeywords;
}

export interface Name {
  "en-US": string;
}

export interface Description {
  "en-US": string;
}

export interface Category {
  typeId: string;
  id: string;
}

export interface CategoryOrderHints {}

export interface Slug {
  "en-US": string;
}

export interface MetaTitle {
  "en-US": string;
  "ru-RU": string;
}

export interface MetaDescription {
  "en-US": string;
  "ru-RU": string;
}

export interface MasterVariant {
  id: number;
  sku: string;
  key: string;
  prices: Price[];
  images: Image[];
  //attributes: any[]
  //assets: any[]
}

export interface Price {
  id: string;
  value: Value;
  validFrom: string;
  validUntil: string;
  discounted: Discounted;
}

export interface Value {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface Discounted {
  value: Value2;
  discount: Discount;
}

export interface Value2 {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface Discount {
  typeId: string;
  id: string;
}

export interface Image {
  url: string;
  label: string;
  dimensions: Dimensions;
}

export interface Dimensions {
  w: number;
  h: number;
}

export interface SearchKeywords {}

export interface Staged {
  name: Name2;
  description: Description2;
  categories: Category2[];
  categoryOrderHints: CategoryOrderHints2;
  slug: Slug2;
  metaTitle: MetaTitle2;
  metaDescription: MetaDescription2;
  masterVariant: MasterVariant2;
  //variants: any[]
  searchKeywords: SearchKeywords2;
}

export interface Name2 {
  "en-US": string;
}

export interface Description2 {
  "en-US": string;
}

export interface Category2 {
  typeId: string;
  id: string;
}

export interface CategoryOrderHints2 {}

export interface Slug2 {
  "en-US": string;
}

export interface MetaTitle2 {
  "en-US": string;
  "ru-RU": string;
}

export interface MetaDescription2 {
  "en-US": string;
  "ru-RU": string;
}

export interface MasterVariant2 {
  id: number;
  sku: string;
  key: string;
  prices: Price2[];
  images: Image2[];
  //attributes: any[]
  //assets: any[]
}

export interface Price2 {
  id: string;
  value: Value3;
  validFrom: string;
  validUntil: string;
  discounted: Discounted2;
}

export interface Value3 {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface Discounted2 {
  value: Value4;
  discount: Discount2;
}

export interface Value4 {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface Discount2 {
  typeId: string;
  id: string;
}

export interface Image2 {
  url: string;
  label: string;
  dimensions: Dimensions2;
}

export interface Dimensions2 {
  w: number;
  h: number;
}

export interface SearchKeywords2 {}

export interface Category {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: LastModifiedBy;
  createdBy: CreatedBy;
  name: Name;
  slug: Slug;
  description: Description;
  //ancestors: any[]
  orderHint: string;
  metaTitle: MetaTitle;
  //assets: any[]
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

export interface Name {
  "en-US": string;
}

export interface Slug {
  "en-US": string;
}

export interface Description {
  "en-US": string;
}

export interface MetaTitle {
  "en-US": string;
}

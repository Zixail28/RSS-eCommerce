import imgProduct from "../assets/images/product.svg";
import imgProduct2 from "../assets/images/cart.svg";

type Category = {
  id: number;
  name: string;
};

export const categories: Category[] = [
  { id: 1, name: "Woman’s Fashion" },
  { id: 2, name: "Men’s Fashion" },
  { id: 3, name: "Electronics" },
  { id: 4, name: "Home & Lifestyle" },
  { id: 5, name: "Medicine" },
  { id: 6, name: "Sports & Outdoor" },
  { id: 7, name: "Baby’s & Toys" },
  { id: 8, name: "Groceries & Pets" },
  { id: 9, name: "Health & Beauty" },
];

export type FiltItem = {
  brand: string[];
  color: string[];
  availability: string[];
  discountToDay: boolean;
};

export type ProductItem = {
  id: number;
  images: string[];
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  price: number;
  priceOld: number;
  filter: FiltItem;
};

export const productsList: ProductItem[] = [
  {
    id: 1,
    images: [imgProduct, imgProduct2, imgProduct],
    name: "1HAVIT HV-G92 Woman",
    category: "Woman’s Fashion",
    shortDescription: "HAVIT HV-G92 Woman",
    description: "HAVIT HV-G92 Woman 123444444",
    price: 120,
    priceOld: 160,
    filter: {
      brand: ["Nice", "Adidas"],
      color: ["red", "green"],
      availability: ["in shop"],
      discountToDay: true,
    },
  },
  {
    id: 2,
    images: [imgProduct],
    name: "2AK-900 Wired Woman",
    category: "Woman’s Fashion",
    shortDescription: "AK-900 Wired Woman",
    description: "Aaaa ssss dgfdgdfg 123444444",
    price: 960,
    priceOld: 1120,
    filter: {
      brand: ["Nice"],
      color: ["red"],
      availability: ["in shop"],
      discountToDay: false,
    },
  },
  {
    id: 3,
    images: [imgProduct],
    name: "3IPS LCD Gaming Woman",
    category: "Woman’s Fashion",
    shortDescription: "IPS LCD Gaming Woman",
    description: "Aaaa ssss dgfdgdfg 123444444",
    price: 370,
    priceOld: 400,
    filter: {
      brand: ["Nice"],
      color: ["red"],
      availability: ["in shop"],
      discountToDay: true,
    },
  },
  {
    id: 4,
    images: [imgProduct],
    name: "4S-Series Comfort Chair",
    category: "Men’s Fashion",
    shortDescription: "S-Series Comfort Chair",
    description: "Aaaa ssss dgfdgdfg 123444444",
    price: 375,
    priceOld: 400,
    filter: {
      brand: ["Nice"],
      color: ["white"],
      availability: ["in shop"],
      discountToDay: false,
    },
  },
  {
    id: 5,
    images: [imgProduct],
    name: "5L-Series Comfort Chair",
    category: "Men’s Fashion",
    shortDescription: "L-Series Comfort Chair",
    description: "Aaaa ssss dgfdgdfg 123444444",
    price: 375,
    priceOld: 400,
    filter: {
      brand: ["Nice"],
      color: ["red"],
      availability: ["on order"],
      discountToDay: false,
    },
  },
  {
    id: 6,
    images: [imgProduct],
    name: "6HAVIT HV-G92 Gamepad",
    category: "Men’s Fashion",
    shortDescription: "HAVIT HV-G92 Gamepad",
    description: "Aaaa ssss dgfdgdfg 123444444",
    price: 120,
    priceOld: 160,
    filter: {
      brand: ["Nice"],
      color: ["red"],
      availability: ["on order"],
      discountToDay: false,
    },
  },
  {
    id: 7,
    images: [imgProduct],
    name: "7AK-900 Wired Keyboard",
    category: "Men’s Fashion",
    shortDescription: "AK-900 Wired Keyboard",
    description: "Aaaa ssss dgfdgdfg 123444444",
    price: 960,
    priceOld: 1120,
    filter: {
      brand: ["Nice"],
      color: ["green"],
      availability: ["in shop"],
      discountToDay: false,
    },
  },
  {
    id: 8,
    images: [imgProduct],
    name: "8IPS LCD Gaming Monitor",
    category: "Men’s Fashion",
    shortDescription: "IPS LCD Gaming Monitor",
    description: "Aaaa ssss dgfdgdfg 123444444",
    price: 370,
    priceOld: 400,
    filter: {
      brand: ["Nice"],
      color: ["red"],
      availability: ["in shop"],
      discountToDay: false,
    },
  },
  {
    id: 9,
    images: [imgProduct],
    name: "9S-Series Comfort Chair",
    category: "Men’s Fashion",
    shortDescription: "S-Series Comfort Chair",
    description: "Aaaa ssss dgfdgdfg 123444444",
    price: 375,
    priceOld: 400,
    filter: {
      brand: ["Nice"],
      color: ["green"],
      availability: ["in shop"],
      discountToDay: true,
    },
  },
  {
    id: 10,
    images: [imgProduct],
    name: "10L-Series Comfort Chair",
    category: "Men’s Fashion",
    shortDescription: "L-Series Comfort Chair",
    description: "Aaaa ssss dgfdgdfg 123444444",
    price: 375,
    priceOld: 400,
    filter: {
      brand: ["Nice"],
      color: ["red"],
      availability: ["in shop"],
      discountToDay: false,
    },
  },
  {
    id: 11,
    images: [imgProduct],
    name: "11HAVIT HV-G92 Woman",
    category: "Woman’s Fashion",
    shortDescription: "HAVIT HV-G92 Woman",
    description: "HAVIT HV-G92 Woman 123444444",
    price: 120,
    priceOld: 160,
    filter: {
      brand: ["Nice"],
      color: ["red"],
      availability: ["in shop"],
      discountToDay: true,
    },
  },
  {
    id: 12,
    images: [imgProduct],
    name: "12HAVIT HV-G92 Woman",
    category: "Woman’s Fashion",
    shortDescription: "HAVIT HV-G92 Woman",
    description: "HAVIT HV-G92 Woman 123444444",
    price: 120,
    priceOld: 160,
    filter: {
      brand: ["Nice"],
      color: ["red"],
      availability: ["in shop"],
      discountToDay: true,
    },
  },

  {
    id: 13,
    images: [imgProduct],
    name: "Apbjdfhvbudf",
    category: "Electronics",
    shortDescription: "L-Series Comfort Chair",
    description: "Aaaa ssss dgfdgdfg 123444444",
    price: 199,
    priceOld: 200,
    filter: {
      brand: ["Elect", "Elect2"],
      color: ["red"],
      availability: ["in shop"],
      discountToDay: false,
    },
  },
  {
    id: 14,
    images: [imgProduct],
    name: "ppafgdfg",
    category: "Electronics",
    shortDescription: "HAVIT HV-G92 Woman",
    description: "HAVIT HV-G92 Woman 123444444",
    price: 120,
    priceOld: 160,
    filter: {
      brand: ["Elect", "Elect2"],
      color: ["red"],
      availability: ["in shop"],
      discountToDay: true,
    },
  },
  {
    id: 15,
    images: [imgProduct],
    name: "kjhg HV-G92 Woman",
    category: "Electronics",
    shortDescription: "HAVIT HV-G92 Woman",
    description: "HAVIT HV-G92 Woman 123444444",
    price: 12,
    priceOld: 16,
    filter: {
      brand: ["Elect", "Elect2"],
      color: ["red"],
      availability: ["in shop"],
      discountToDay: true,
    },
  },
];

import imgProduct from "../assets/images/product.svg";

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

export type Product = {
  id: number;
  images: string;
  name: string, 
  price: number,
  priceOld: number
};

export const productsList: Product[] = [
  { id: 1, images: imgProduct, name: "HAVIT HV-G92 Gamepad",  price: 120, priceOld: 160 },
  { id: 2, images: imgProduct, name: "AK-900 Wired Keyboard",  price: 960, priceOld: 1120 },
  { id: 3, images: imgProduct, name: "IPS LCD Gaming Monitor",  price: 370, priceOld: 400 },
  { id: 4, images: imgProduct, name: "S-Series Comfort Chair",  price: 375, priceOld: 400 },
  { id: 5, images: imgProduct, name: "L-Series Comfort Chair",  price: 375, priceOld: 400 },
];
export type TProductStore = {
  itemCategoryId: string;
  price: number;
  promotionPercent: number;
  currency: string;
  name: string;
  code: string;
  description: string;
  image: string;
  status: 'Active' | 'InActive';
};

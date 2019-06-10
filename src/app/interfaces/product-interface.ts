import { CategoryInterface } from './category-interface';
import { SubCategoryInterface } from './sub-category-interface';
import { ProviderInterface } from './provider-interface';

export interface ProductInterface {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  qty?: number;
  category?: CategoryInterface;
  subCategory?: SubCategoryInterface;
  provider?: ProviderInterface;
  createdAt?: Date;
  active?: boolean;
}

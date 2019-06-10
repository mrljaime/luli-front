import { CategoryInterface } from './category-interface';

export interface SubCategoryInterface {
  id?: number;
  name?: string;
  category?: CategoryInterface;
}

import { Recipe } from "./Recipe";

export interface ShoppingList {
  id: number;
  name: string;
  recipes: Recipe[];
}

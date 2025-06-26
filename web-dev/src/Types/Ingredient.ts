export interface Ingredient {
  id: number;
  name: string;
  price: number;
  tag: IngredientTagType;
}
export type IngredientTagType = "protein" | "vegetable" | "starchy";

export enum IngredientTagEnum  {
  PROTEIN = "protein",
  VEGETABLE =  "vegetable",
  STARCHY = "starchy"
}


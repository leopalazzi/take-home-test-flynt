import { Ingredient } from "./Ingredient";

export interface Recipe {
  id: number;
  name: string;
  numberOfPeople: number;
  timeToCook: number;
  ingredients: Ingredient[];
}

import { getRepository } from "typeorm";
import { Ingredient } from "../Entities/Ingredient";

export class IngredientService {
  static async list(): Promise<Ingredient[]> {
    const ingredient = await getRepository(Ingredient).find();
    return ingredient;
  }

  static async create(ingredient: Ingredient): Promise<Ingredient> {
    const newIngredient = await getRepository(Ingredient).save(ingredient);
    return newIngredient;
  }

  static async update(ingredient: Ingredient): Promise<Ingredient> {
    const updatedIngredient = await getRepository(Ingredient).save(ingredient);
    return updatedIngredient;
  }

  static async delete(id: number): Promise<void> {
    await getRepository(Ingredient).delete(id);
  }
}

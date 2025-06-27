import { getRepository, In } from "typeorm";
import { Ingredient } from "../Entities/Ingredient";
import { Recipe } from "../Entities/Recipe";

export class RecipeService {
  static async list(): Promise<Recipe[]> {
    const recipes = await getRepository(Recipe).find({
      relations: ["ingredients"],
    });
    return recipes;
  }

static async create(recipe: Recipe): Promise<Recipe> {
  const ingredientRepo = getRepository(Ingredient);
  const recipeRepo = getRepository(Recipe);

  if (recipe.ingredients?.length > 0) {
    const ingredients = await ingredientRepo.find({
      where: { id: In(recipe.ingredients) },
    });

    const proteinIngredients = ingredients.filter(i => i.tag === "protein");

    if (proteinIngredients.length > 1) {
      throw new Error("A recipe contains only one protein.");
    }

    for (const protein of proteinIngredients) {
      const existingRecipe = await recipeRepo
        .createQueryBuilder("recipe")
        .leftJoinAndSelect("recipe.ingredients", "ingredient")
        .where("ingredient.id = :id", { id: protein.id })
        .getOne();

      if (existingRecipe) {
        throw new Error(
          `The protein ${protein.name} is already used in the recipe ${existingRecipe.name}.`
        );
      }
    }

    recipe.ingredients = ingredients;
  }

  const newRecipe = await recipeRepo.save(recipe);
  return newRecipe;
}


  static async update(recipe: Recipe): Promise<Recipe> {
    const updatedRecipe = await getRepository(Recipe).save(recipe);
    return updatedRecipe;
  }

  static async delete(id: number): Promise<void> {
    await getRepository(Recipe).delete(id);
  }
}

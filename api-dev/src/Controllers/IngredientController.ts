import { IngredientService } from "../Services/IngredientService";

export class IngredientController {
  public static async list(req: any, res: any, next: any): Promise<void> {
    try {
      const recipes = await IngredientService.list();
      res.send(recipes);
    } catch (err) {
      console.error("[IngredientController.list] Error listing recipes", err);
      res.send(500);
    }
  }

  public static async create(req: any, res: any, next: any): Promise<void> {
    try {
      const recipe = await IngredientService.create(req.body);
      res.send(recipe);
    } catch (err) {
      console.error("[IngredientController.create] Error creating recipe", err);
      res.send(500);
    }
  }

  public static async update(req: any, res: any, next: any): Promise<void> {
    try {
      const recipe = await IngredientService.update(req.body);
      res.send(recipe);
    } catch (err) {
      console.error("[IngredientController.update] Error updating recipe", err);
      res.send(500);
    }
  }

  public static async delete(req: any, res: any, next: any): Promise<void> {
    try {
      await IngredientService.delete(req.params.id);
      res.send();
    } catch (err) {
      console.error("[IngredientController.delete] Error deleting recipe", err);
      res.send(500);
    }
  }
}

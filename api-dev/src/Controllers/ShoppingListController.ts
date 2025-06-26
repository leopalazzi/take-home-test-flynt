import { ShoppingListService } from "../Services/ShoppingListService";

export class ShoppingListController {
  public static async getOne(req: any, res: any, next: any): Promise<void> {
    try {
      const shoppingList = await ShoppingListService.getOne(req.params.id);
      res.send(shoppingList);
    } catch (err) {
      console.error(
        "[ShoppingListController.getOne] Error getting shopping list",
        err
      );
      res.send(500);
    }
  }

  public static async list(req: any, res: any, next: any): Promise<void> {
    try {
      const shoppingList = await ShoppingListService.list();
      res.send(shoppingList);
    } catch (err) {
      console.error(
        "[ShoppingListController.list] Error listing shopping list",
        err
      );
      res.send(500);
    }
  }

  public static async create(req: any, res: any, next: any): Promise<void> {
    try {
      const shoppingList = await ShoppingListService.create(req.body);
      res.send(shoppingList);
    } catch (err) {
      console.error(
        "[ShoppingListController.create] Error creating shopping list",
        err
      );
      res.send(500);
    }
  }

  public static async update(req: any, res: any, next: any): Promise<void> {
    try {
      const shoppingList = await ShoppingListService.update(req.body);
      res.send(shoppingList);
    } catch (err) {
      console.error(
        "[ShoppingListController.update] Error updating shopping list",
        err
      );
      res.send(500);
    }
  }

  public static async delete(req: any, res: any, next: any): Promise<void> {
    try {
      await ShoppingListService.delete(req.params.id);
      res.send();
    } catch (err) {
      console.error("[RecipeController.delete] Error deleting recipe", err);
      res.send(500);
    }
  }
}

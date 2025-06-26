import { response, Router } from "express";
import { IngredientController } from "../Controllers/IngredientController";
import { RecipeController } from "../Controllers/RecipeController";
import { ShoppingListController } from "../Controllers/ShoppingListController";

// GLOBAL ROUTER
const routes = Router();

// RECIPES
const recipeRouter = Router();
recipeRouter.get("/list", RecipeController.list);
recipeRouter.post("/create", RecipeController.create);
recipeRouter.put("/update", RecipeController.update);
recipeRouter.delete("/delete/:id", RecipeController.delete);

// INGREDIENTS
const ingredientRouter = Router();
ingredientRouter.get("/list", IngredientController.list);
ingredientRouter.post("/create", IngredientController.create);
ingredientRouter.put("/update", IngredientController.update);
ingredientRouter.delete("/delete/:id", IngredientController.delete);

// SHOPPING LIST
const shoppingListRouter = Router();
shoppingListRouter.get("/list/:id", ShoppingListController.getOne);
shoppingListRouter.get("/list", ShoppingListController.list);
shoppingListRouter.post("/create", ShoppingListController.create);
shoppingListRouter.put("/update", ShoppingListController.update);
shoppingListRouter.delete("/delete/:id", ShoppingListController.delete);

// BINDS
routes.use("/recipe", recipeRouter);
routes.use("/ingredient", ingredientRouter);
routes.use("/shopping-list", shoppingListRouter);

export default routes;

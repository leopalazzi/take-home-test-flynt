export enum Requests {
  // INGREDIENT

  // queries
  listIngredient = "listIngredientQuery",
  // mutations
  createIngredient = "createIngredientMutation",
  updateIngredient = "updateIngredientMutation",
  deleteIngredient = "deleteIngredientMutation",

  // RECIPE

  // queries
  listRecipe = "listRecipeQuery",
  // mutations
  createRecipe = "createRecipeMutation",
  updateRecipe = "updateRecipeMutation",
  deleteRecipe = "deleteRecipeMutation",

  // SHOPPING LIST

  // queries
  getOneShoppingList = "getOneShoppingListQuery",
  listShoppingList = "listShoppingListQuery",
  // mutations
  createShoppingList = "createShoppingList",
  updateShoppingList = "updateShoppingList",
  deleteShoppingList = "deleteShoppingList",
}

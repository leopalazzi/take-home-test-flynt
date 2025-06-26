import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import axios from "../../Utils/axios";
import { Requests } from "../QueriesAndMutationList";

interface RecipeCreateType {
  name: string;
  timeToCook: number;
  numberOfPeople: number;
  ingredients: number[];
}
export const useMutationRecipeCreate = (): UseMutationResult<
  any,
  unknown,
  RecipeCreateType
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.createIngredient],
    async ({
      name,
      timeToCook,
      numberOfPeople,
      ingredients,
    }: RecipeCreateType) => {
      return await axios.post(`/recipe/create`, {
        name,
        timeToCook,
        numberOfPeople,
        ingredients,
      });
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listRecipe);
      },
    }
  );
};

export const useMutationRecipeDelete = (): UseMutationResult<
  any,
  unknown,
  number
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.deleteRecipe],
    async (id: number) => {
      return await axios.delete(`/recipe/delete/${id}`);
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listRecipe);
      },
    }
  );
};

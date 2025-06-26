import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import axios from "../../Utils/axios";
import { Requests } from "../QueriesAndMutationList";

export interface ShoppingListCreateType {
  name: string;
  numberOfMeals: number;
  maximumPrice: number | undefined;
  numberOfPeople: number | undefined;
}

export const useMutationShoppingListCreate = (): UseMutationResult<
  any,
  unknown,
  any
> => {
  const clientQuery = useQueryClient();
  return useMutation(
    [Requests.createShoppingList],
    async ({ name, numberOfMeals, maximumPrice, numberOfPeople }: any) => {
      return await axios.post(`/shopping-list/create`, {
        name,
        numberOfMeals,
        maximumPrice,
        numberOfPeople,
      });
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listShoppingList);
      },
    }
  );
};

export const useMutationShoppingListDelete = (): UseMutationResult<
  any,
  unknown,
  number
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.deleteRecipe],
    async (id: number) => {
      return await axios.delete(`/shopping-list/delete/${id}`);
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listShoppingList);
      },
    }
  );
};
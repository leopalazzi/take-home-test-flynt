import { useQuery, UseQueryResult } from "react-query";
import { ShoppingList } from "../../Types/ShoppingList";
import axios from "../../Utils/axios";
import { Requests } from "../QueriesAndMutationList";

export const useQueryShoppingListList = (): UseQueryResult<any, unknown> => {
  return useQuery([Requests.listShoppingList], async () => {
    const { data } = await axios.get<{ data: Partial<ShoppingList[]> }>(
      "/shopping-list/list"
    );
    return data ?? [];
  });
};

export const useQueryShoppingListGetOne = (
  id: number | undefined
): UseQueryResult<any, unknown> => {
  if (id === undefined) {
    throw new Error("id is undefined");
  }
  return useQuery([Requests.getOneShoppingList], async () => {
    const { data } = await axios.get<{ data: Partial<ShoppingList> }>(
      `/shopping-list/list/${id}`
    );
    return data;
  });
};

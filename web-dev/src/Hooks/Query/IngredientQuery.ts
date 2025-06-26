import { useQuery, UseQueryResult } from "react-query";
import { Ingredient } from "../../Types/Ingredient";
import axios from "../../Utils/axios";
import { Requests } from "../QueriesAndMutationList";

export const useQueryIngredientList = (): UseQueryResult<any, unknown> => {
  return useQuery([Requests.listIngredient], async () => {
    const { data } = await axios.get<{ data: Partial<Ingredient> }>(
      "/ingredient/list"
    );
    return data ?? [];
  });
};

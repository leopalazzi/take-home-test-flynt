import { useQuery, UseQueryResult } from "react-query";
import axios from "../../Utils/axios";
import { Requests } from "../QueriesAndMutationList";

export const useQueryListRecipe = (): UseQueryResult<any, unknown> => {
  return useQuery([Requests.listRecipe], async () => {
    const { data } = await axios.get<{ data: any }>("/recipe/list");
    return data;
  });
};

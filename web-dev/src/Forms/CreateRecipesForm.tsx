import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { CardCustom } from "../Components/CardCustom";
import { Loader } from "../Components/Loader";
import { useMutationRecipeCreate } from "../Hooks/Mutation/RecipeMutation";
import { useQueryIngredientList } from "../Hooks/Query/IngredientQuery";
import { ErrorPage } from "../Pages/ErrorPage";
import { Ingredient } from "../Types/Ingredient";
import { OptionsMultiSelectType } from "../Types/OptionsMultiSelect";

export function CreateRecipesForm(): JSX.Element {
  const [name, setName] = useState("");
  const [timeToCook, setTimeToCook] = useState<number>(0);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
  const [selectedIngredients, setSelectedIngredients] = useState<
    OptionsMultiSelectType[]
  >([]);
  const { mutateAsync: createRecipe } = useMutationRecipeCreate();
  const { data: ingredients, status, isLoading } = useQueryIngredientList();

  const resetFields = () => {
    setName("");
    setTimeToCook(0);
    setNumberOfPeople(0);
    setSelectedIngredients([]);
  };

  const handlerSubmitNewRecipe = async () => {
    if (!name || !timeToCook || !numberOfPeople || !selectedIngredients) {
      alert("Please fill all the fields");
      return;
    }

    const tagCount = selectedIngredients.reduce(
      (acc, item) => {
        switch (item.tag) {
          case "protein":
            acc.proteins.push(item);
            break;
          case "starchy":
            acc.starches.push(item);
            break;
          case "vegetable":
            acc.vegetables.push(item);
            break;
        }
        return acc;
      },
      { proteins: [], starches: [], vegetables: [] } as {
        proteins: OptionsMultiSelectType[];
        starches: OptionsMultiSelectType[];
        vegetables: OptionsMultiSelectType[];
      }
    );

    if (tagCount.proteins.length > 1) {
      alert("You can only select one protein per recipe.");
      return;
    }

    if (tagCount.starches.length > 1) {
      alert("You can only select one starch per recipe.");
      return;
    }

    try {
      await createRecipe({
        name,
        timeToCook,
        numberOfPeople,
        ingredients: selectedIngredients.map((e) => e.id),
      });
      alert("Recipe created successfully!");
      resetFields();
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || "An unexpected error occurred.";
      alert(errorMessage);
    }
    

  };

  if (status === "error") {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div id="create-recipes-form">
      <Box
        display="flex"
        justifyContent="space-between"
        className="MarginTop16Px"
      >
        <CardCustom isSmall>
          <h2>New recipe</h2>
          <FormControl fullWidth margin="normal">
            <TextField
              id="name-recipe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name of the recipe"
              variant="outlined"
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            {/* on peut mettre plusieurs fois le même ingrédient dans le formulaire mais après ça l'enregistre qu'une fois*/}
            <Autocomplete
              onChange={(_e, values: OptionsMultiSelectType[]) => {
                  setSelectedIngredients(values);
              }}
              value={selectedIngredients}
              multiple
              id="combo-box-demo"
              options={ingredients.map((e: Ingredient) => {
                return { label: e.name, tag: e.tag, id: e.id, value: e.id };
              })}
              renderInput={(params: any) => (
                <TextField {...params} label="Ingredients" />
              )}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              value={timeToCook}
              onChange={(e) =>
                e.target.value
                  ? setTimeToCook(Number(e.target.value))
                  : setTimeToCook(0)
              }
              id="name-recipe"
              label="Time to cook"
              variant="outlined"
              type="number"
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              value={numberOfPeople}
              onChange={(e) =>
                e.target.value
                  ? setNumberOfPeople(Number(e.target.value))
                  : setNumberOfPeople(0)
              }
              id="name-recipe"
              label="Number of people"
              variant="outlined"
              type="number"
              fullWidth
            />
          </FormControl>
          <FormControl margin="normal">
            <Button onClick={handlerSubmitNewRecipe} variant="contained">
              Submit
            </Button>
          </FormControl>
        </CardCustom>
      </Box>
    </div>
  );
}

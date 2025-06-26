import { Box, Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { CardCustom } from "../Components/CardCustom";
import { useMutationShoppingListCreate } from "../Hooks/Mutation/ShoppingListMutation";

export function CreateShoppingListForm(): JSX.Element {
  const { mutateAsync: createShoppingList } = useMutationShoppingListCreate();
  const [name, setName] = useState("");
  const [numberOfMeals, setNumberOfMeals] = useState<number | undefined>(
    undefined
  );
  const [maximumPrice, setMaximumPrice] = useState<number | undefined>(
    undefined
  );
  const [numberOfPeople, setNumberOfPeople] = useState<number | undefined>(
    undefined
  );

  const resetFields = () => {
    setName("");
    setNumberOfMeals(0);
  };

  const handlerSubmitNewRecipe = async () => {
    if (name === undefined || name === "" || numberOfMeals === 0) {
      alert("Please fill all the fields");
      return;
    }
    await createShoppingList({
      name,
      numberOfMeals,
      maximumPrice,
      numberOfPeople,
    });
    resetFields();
  };

  return (
    <div id="create-shopping-list-form">
      <Box
        display="flex"
        justifyContent="space-between"
        className="MarginTop16Px"
      >
        <CardCustom isSmall>
          <h2>New shopping list</h2>
          <FormControl fullWidth margin="normal">
            <TextField
              id="name-shopping-list"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name of the shopping list"
              variant="outlined"
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              id="meal-number-shopping-list"
              value={numberOfMeals}
              onChange={(e) =>
                e.target.value
                  ? setNumberOfMeals(Number(e.target.value))
                  : setNumberOfMeals(undefined)
              }
              label="How many meals in the list"
              variant="outlined"
              type="number"
              fullWidth
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              id="maximum-price-shopping-list"
              value={maximumPrice}
              onChange={(e) =>
                e.target.value
                  ? setMaximumPrice(Number(e.target.value))
                  : setMaximumPrice(undefined)
              }
              label="Maximum price for all the list"
              variant="outlined"
              type="number"
              fullWidth
            />
            <span className="SmallTextExplanation">
              * Optional: if it's empty we will take all the recipes
            </span>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              id="maximum-price-shopping-list"
              value={numberOfPeople}
              onChange={(e) =>
                e.target.value && e.target.value !== ""
                  ? setNumberOfPeople(Number(e.target.value))
                  : setNumberOfPeople(undefined)
              }
              label="Take only recipes with this number of people "
              variant="outlined"
              type="number"
              fullWidth
            />
            <span className="SmallTextExplanation">
              * Optional: if it's empty we will take all the recipes
            </span>
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

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import { Recipe } from "../Types/Recipe";
import { Ingredient } from "../Types/Ingredient";
import { useMutationRecipeDelete } from "../Hooks/Mutation/RecipeMutation";

export function RecipesTable({ recipes }: { recipes: Recipe[] }): JSX.Element {
  const { mutateAsync: deleteRecipe } = useMutationRecipeDelete();

  const handlerButtonDelete = async (recipe: Recipe) => {
    await deleteRecipe(recipe.id);
  };

  const computePriceByIngredient = (ingredients: Ingredient[]) => {
    return ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.price;
    }, 0);
  };

  return (
    <Box className="tableContainer">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>My recipes</TableCell>
              <TableCell align="right">Time to cook</TableCell>
              <TableCell align="right">Number of people</TableCell>
              <TableCell align="right">Ingredients</TableCell>
              <TableCell align="right">Total price</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((row, index) => (
              <TableRow
                key={`recipe_name${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.timeToCook}</TableCell>
                <TableCell align="right">{row.numberOfPeople}</TableCell>
                <TableCell align="right">
                  {row.ingredients.map((ingredient, index) => {
                    return <p key={`ing_name${index}`}>{ingredient.name}</p>;
                  })}
                </TableCell>
                <TableCell align="right">
                  {computePriceByIngredient(row.ingredients) *
                    row.numberOfPeople}
                  €
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => handlerButtonDelete(row)}>
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

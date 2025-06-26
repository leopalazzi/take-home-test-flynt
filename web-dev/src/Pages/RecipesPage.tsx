import { useState } from "react";

import { Box, Button } from "@mui/material";
import { CreateRecipesForm } from "../Forms/CreateRecipesForm";
import { RecipesTable } from "../Tables/RecipesTable";
import { useQueryListRecipe } from "../Hooks/Query/RecipeQuery";
import { Loader } from "../Components/Loader";
import { ErrorPage } from "./ErrorPage";

export function RecipesPage(): JSX.Element {
  const [isCreationMode, setIsCreationMode] = useState(false);

  const activeCreationMode = () => {
    setIsCreationMode(true);
  };

  const cancelCreationMode = () => {
    setIsCreationMode(false);
  };

  const { data, status, isLoading } = useQueryListRecipe();

  if (status === "error") {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div id="recipes-pages">
      <h1>RECIPES</h1>
      <Box>
        <Button
          onClick={isCreationMode ? cancelCreationMode : activeCreationMode}
          variant="outlined"
        >
          {isCreationMode ? "Cancel creation" : "Create new recipe"}
        </Button>
      </Box>
      <Box display={"flex"} gap={2}>
        {isCreationMode && <CreateRecipesForm />}
        <RecipesTable recipes={data} />
      </Box>
    </div>
  );
}

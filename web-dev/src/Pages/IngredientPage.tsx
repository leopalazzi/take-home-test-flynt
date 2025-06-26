import { useState } from "react";
import { Box, Button } from "@mui/material";
import { useQueryIngredientList } from "../Hooks/Query/IngredientQuery";
import { Loader } from "../Components/Loader";
import { ErrorPage } from "./ErrorPage";
import { IngredientTable } from "../Tables/IngredientsTable";
import { CreateIngredientForm } from "../Forms/CreateIngredientForm";

export function IngredientPage(): JSX.Element {
  const [isCreationMode, setIsCreationMode] = useState(false);

  const activeCreationMode = () => {
    setIsCreationMode(true);
  };

  const cancelCreationMode = () => {
    setIsCreationMode(false);
  };

  const { data, status, isLoading } = useQueryIngredientList();

  if (status === "error") {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div id="recipes-pages">
      <h1>INGREDIENTS</h1>
      <Box>
        <Button
          onClick={isCreationMode ? cancelCreationMode : activeCreationMode}
          variant="outlined"
        >
          {isCreationMode ? "Cancel creation" : "Create new ingredient"}
        </Button>
      </Box>
      <Box display={"flex"} gap={2}>
        {isCreationMode && <CreateIngredientForm />}
        <IngredientTable ingredients={data} />
      </Box>
    </div>
  );
}

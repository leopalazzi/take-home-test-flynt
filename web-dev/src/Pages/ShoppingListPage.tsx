import { Box, Button } from "@mui/material";
import { useState } from "react";
import { Loader } from "../Components/Loader";
import { CreateShoppingListForm } from "../Forms/CreateShoppingListForm";
import { useQueryShoppingListList } from "../Hooks/Query/ShoppingListQuery";
import { ShoppingListTable } from "../Tables/ShoppingListTable";
import { ErrorPage } from "./ErrorPage";

export function ShoppingListPage(): JSX.Element {
  const [isCreationMode, setIsCreationMode] = useState(false);

  const activeCreationMode = () => {
    setIsCreationMode(true);
  };

  const cancelCreationMode = () => {
    setIsCreationMode(false);
  };

  const { data, status, isLoading } = useQueryShoppingListList();

  if (status === "error") {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div id="shopping-list-pages">
      <h1>SHOPPING LIST</h1>
      <Box>
        <Button
          onClick={isCreationMode ? cancelCreationMode : activeCreationMode}
          variant="outlined"
        >
          {isCreationMode ? "Cancel generation" : "Generate new shopping list"}
        </Button>
      </Box>
      <Box display={"flex"} gap={2}>
        {isCreationMode && <CreateShoppingListForm />}
        <ShoppingListTable shoppingList={data} />
      </Box>
    </div>
  );
}

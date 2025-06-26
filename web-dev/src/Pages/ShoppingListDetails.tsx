import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../Components/Loader";
import { useQueryShoppingListGetOne } from "../Hooks/Query/ShoppingListQuery";
import { Recipe } from "../Types/Recipe";
import { ErrorPage } from "./ErrorPage";

export function ShoppingListDetails(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, status, isLoading } = useQueryShoppingListGetOne(
    id ? Number.parseInt(id) : undefined
  );

  function handleGoBack() {
    navigate("/shopping-list");
  }

  if (status === "error") {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div id="shopping-list-detail-pages">
      <div className="ShoppingListDetailContainer">
        <Button onClick={handleGoBack} variant="outlined">
          Go back
        </Button>
        <h1>SHOPPING LIST DETAILS</h1>
      </div>

      <Box>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {data.name}
            </Typography>

            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Content of your shopping list
            </Typography>

            <ul>
              {data?.recipes?.map((item: Recipe, index: number) => (
                <li key={`${index}-name-item-li`}>
                  <p key={`${index}-name-item`}>{item.name}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

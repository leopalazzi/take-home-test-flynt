import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HomePageCard } from "../Components/HomePageCard";

export function HomePage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div id="home-pages">
      <h1>WELCOME TO OUR FANTASTIC SHOPPING LIST HELPER </h1>

      <Box className="MarginBottom16Px">
        <span>
          The goal of this product it's to generate your menu and fill your
          fridge easily !
        </span>
      </Box>

      <Box className="MarginBottom32Px">
        <span className="BoldText">Try it now !</span>
      </Box>
      <Box display={"flex"} gap={2}>
        <HomePageCard
          cardTitle={"STEP 1"}
          buttonText={"New ingredients page"}
          text={"Start by creating your ingredients."}
          onClick={() => navigate("/ingredients")}
        />

        <HomePageCard
          cardTitle={"STEP 2"}
          buttonText={"New recipes page"}
          text={"After that create your recipes with ingredients."}
          onClick={() => navigate("/recipes")}
        />

        <HomePageCard
          cardTitle={"STEP 3"}
          buttonText={"New shopping lists page"}
          text={
            "  And now you can generate some shopping lists with all recipes"
          }
          onClick={() => navigate("/shopping-list")}
        />
      </Box>
    </div>
  );
}

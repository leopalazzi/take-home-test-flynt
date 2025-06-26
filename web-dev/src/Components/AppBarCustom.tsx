import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const pages = [
  { name: "Ingredients", path: "/ingredients" },
  { name: "Recipes", path: "/recipes" },
  { name: "Shopping lists", path: "/shopping-list" },
  { name: "Parameters", path: "/parameters" },
];

export function AppBarCustom(): JSX.Element {
  const sxStyleButton = { my: 2, color: "white", display: "block" };

  const sxStyleTypo = {
    mr: 2,
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={sxStyleTypo}
          >
            SHOPPING LIST HELPER
          </Typography>

          <Box className="AppBarButtonContainer">
            {pages.map((page) => (
              <Button href={page.path} key={page.name} sx={sxStyleButton}>
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

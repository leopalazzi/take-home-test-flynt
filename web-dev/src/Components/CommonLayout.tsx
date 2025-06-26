import { Box } from "@mui/material";
import React from "react";

export function CommonLayout(props: {
  children: JSX.Element[] | JSX.Element;
}): JSX.Element {
  return (
    <Box>
      <Box className="CommonLayout">{props.children}</Box>
    </Box>
  );
}

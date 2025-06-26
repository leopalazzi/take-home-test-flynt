import { Box, Button } from "@mui/material";
import { CardCustom } from "./CardCustom";

export function HomePageCard(props: {
  cardTitle: string;
  buttonText: string;
  text: string;
  onClick: () => void;
}): JSX.Element {
  return (
    <Box className="MarginBottom32Px">
      <CardCustom title={props.cardTitle} isSmall>
        <Box className="MarginBottom16Px">
          <Button onClick={props.onClick} variant="outlined">
            {props.buttonText}
          </Button>
        </Box>
        <span>{props.text}</span>
      </CardCustom>
    </Box>
  );
}

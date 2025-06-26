import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";

export function Loader(): JSX.Element {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
}

import app from "./app";
import { IngredientController } from "./Controllers/IngredientController";
import { Logger } from "./logger";

app.listen(3001, () => {
  Logger.info(`Server started on port 3001`);
});

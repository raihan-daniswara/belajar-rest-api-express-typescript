import app from "./app";
import { logger } from "./utils/logger";

const port: number = Number(process.env.PORT) || 4000;

app.listen(port, () => logger.info(`Server is running at port ${port}`));

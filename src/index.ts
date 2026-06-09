import { logger } from "./utils/logger";
import createServer from "./utils/server";
import "./utils/connectDB";

const app = createServer();
const port: number = Number(process.env.PORT) || 4000;

app.listen(port, () => logger.info(`Server is running at port ${port}`));

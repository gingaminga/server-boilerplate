import celebrateErrorHandlerMiddleware from "@middlewares/celebrate-error-handler.middleware";
import notFoundMiddleware from "@middlewares/not-found.middleware";
import requestInfoMiddleware from "@middlewares/request-info.middleware";
import responseFormatMiddleware from "@middlewares/response-format.middleware";
import routers from "@routes/status.route";
import constants from "@utils/constants";
import express, { Request, Response, NextFunction } from "express";

const app = express();
app.set("port", constants.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestInfoMiddleware);
app.use(responseFormatMiddleware);

app.use("/api", routers);
app.use(notFoundMiddleware);
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  celebrateErrorHandlerMiddleware(error, res);
});

export default app;

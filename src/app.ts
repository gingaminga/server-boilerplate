import notFoundMiddleware from "@middlewares/not-found.middleware";
import requestInfoMiddleware from "@middlewares/request-info.middleware";
import responseFormatMiddleware from "@middlewares/response-format.middleware";
import routers from "@routes/status.route";
import constants from "@utils/constants";
import express from "express";

const app = express();
app.set("port", constants.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestInfoMiddleware);
app.use(responseFormatMiddleware);

app.use("/api", routers);
app.use(notFoundMiddleware);

export default app;

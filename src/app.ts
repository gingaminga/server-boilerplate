import errorHandlerMiddleware from "@/middlewares/error-handler.middleware";
import notFoundMiddleware from "@/middlewares/not-found.middleware";
import requestInfoMiddleware from "@/middlewares/request-info.middleware";
import responseFormatMiddleware from "@/middlewares/response-format.middleware";
import routers from "@/routes";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestInfoMiddleware);
app.use(responseFormatMiddleware);

app.use("/api", routers);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;

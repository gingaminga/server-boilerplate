import notFoundMiddleware from "@middlewares/not-found.middleware";
import requestInfoMiddleware from "@middlewares/request-info.middleware";
import responseFormatMiddleware from "@middlewares/response-format.middleware";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestInfoMiddleware);
app.use(responseFormatMiddleware);
app.use(notFoundMiddleware);

export default app;

import requestInfoMiddleware from "@middlewares/requestInfoMiddleware";
import constants from "@/utils/constants";
import express from "express";

const app = express();
app.set("port", constants.PORT);

app.use(requestInfoMiddleware);

export default app;

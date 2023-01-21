import requestInfo from "@middlewares/requestInfo";
import constants from "@utils/constants";
import express from "express";

const app = express();
app.set("port", constants.PORT);

app.use(requestInfo);

export default app;

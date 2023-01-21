import notFound from "@middlewares/notFound";
import requestInfo from "@middlewares/requestInfo";
import responseFormat from "@middlewares/responseFormat";
import constants from "@utils/constants";
import express from "express";

const app = express();
app.set("port", constants.PORT);

app.use(requestInfo);
app.use(responseFormat);
app.use(notFound);

export default app;

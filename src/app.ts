import notFound from "@middlewares/not-found.middleware";
import requestInfo from "@middlewares/request-info.middleware";
import responseFormat from "@middlewares/response-format.middleware";
import routers from "@routes/status.route";
import constants from "@utils/constants";
import express from "express";

const app = express();
app.set("port", constants.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestInfo);
app.use(responseFormat);

app.use("/api", routers);
app.use(notFound);

export default app;

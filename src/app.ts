import notFound from "@middlewares/notFound";
import requestInfo from "@middlewares/requestInfo";
import responseFormat from "@middlewares/responseFormat";
import routers from "@routers/index";
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

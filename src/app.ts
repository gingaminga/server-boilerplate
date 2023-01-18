import constants from "@/utils/constants";
import express from "express";

const app = express();
app.set("port", constants.PORT);

export default app;

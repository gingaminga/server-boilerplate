import express from "express";

import constants from "@utils/constants";

const app = express();

app.listen(constants.PORT, () => {
  console.log(`Listening on port ${constants.PORT}`);
});

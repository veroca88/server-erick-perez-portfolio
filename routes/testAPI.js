const express = require("express");
const router = express.Router();

router.get("/testAPI", (req, res, next) => {
  res.send("IT IS WORKING");
});

module.exports = router;

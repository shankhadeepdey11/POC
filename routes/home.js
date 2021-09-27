const express = require("express");

const router = express.Router();

//GET Request
router.get("/", (req, res) => {
  res.send("Welcome to genres API");
});

module.exports = router;

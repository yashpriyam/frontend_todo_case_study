const express = require("express");
const {
  getCardLists,
  updateCardList,
} = require("../controllers/cardList-controller");
const cardListRoutes = express.Router();

cardListRoutes.get("/", getCardLists);
cardListRoutes.post("/update", updateCardList);

module.exports = cardListRoutes;

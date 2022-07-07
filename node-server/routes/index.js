const router = require("express").Router();

const authRoutes = require("./auth-routes");
const cardListRoutes = require("./cardList-routes");

router.use("/api/auth", authRoutes);
router.use("/api/cardList", cardListRoutes);

module.exports = router;

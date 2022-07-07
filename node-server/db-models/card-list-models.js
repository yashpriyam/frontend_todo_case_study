const mongoose = require("mongoose");

const cardListSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  cardList: [
    {
      title: { type: String, required: true, unique: true, default: "TODO" },
      id: { type: String, required: true, unique: true, default: "1" },
      cards: [
        // {
        //   title: String,
        //   id: String,
        //   description: String,
        // },
      ],
    },
  ],
});

const cardList = mongoose.model("CardList", cardListSchema);

module.exports = cardList;

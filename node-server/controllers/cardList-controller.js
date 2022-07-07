import CardList from "../db-models/card-list-models";

export const getCardLists = async (req, res) => {
  try {
    const cardListData = await CardList.find({});
    return res.status(200).send(cardListData[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateCardList = async (req, res) => {
  try {
    const { state, cardListId } = req.body;

    const cardListData = await CardList.replaceOne(
      { _id: cardListId },
      { cardList: state, _id: cardListId }
    );

    console.log({ cardListData });

    res.send("success");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

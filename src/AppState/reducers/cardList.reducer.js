import axios from "axios";

export let cardListState = [];

export const cardListReducer = (state, action) => {
  switch (action.type) {
    case "addCard":
    case "removeCard":
    case "moveTask":
    case "cardInput":
      state = action.value;

      const cardListId = JSON.parse(localStorage.getItem("cardListId"));

      axios.post("/api/cardList/update", { state, cardListId });

      return state;
    case "getAllCardList":
      state = action.value;
      return state;
    default:
      return state;
  }
};

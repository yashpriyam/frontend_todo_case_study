// export const cardListState = JSON.parse(localStorage.getItem("userData"))
//   ? JSON.parse(localStorage.getItem("userData")).state
//   : []; // add api call to get all items

import axios from "axios";

// export const cardListState = [
// { id: 1, title: "TODO", cards: [] },
// { id: 2, title: "In-Progress", cards: [] },
// { id: 3, title: "Done", cards: [] },
// ];

/* 

  "cardList": [
    {
      "title": "TODO",
      "id": "1",
      "cards": [],
      "_id": {
        "$oid": "62c6b9b1be0a8384b6dcb7f0"
      }
    },
    {
      "title": "In-Progress",
      "id": "2",
      "cards": [],
      "_id": {
        "$oid": "62c6b9b1be0a8384b6dcb7f1"
      }
    },
    {
      "title": "Done",
      "id": "3",
      "cards": [],
      "_id": {
        "$oid": "62c6b9b1be0a8384b6dcb7f2"
      }
    }
  ],
  */

export let cardListState = [];

export const cardListReducer = (state, action) => {
  switch (action.type) {
    case "addCard":
    case "removeCard":
    case "moveTask":
    case "cardInput":
      state = action.value;
      // api call to send all data to backend
      // localStorage.setItem(
      //   "userData",
      //   JSON.stringify({
      //     state,
      //   })
      // );
      const cardListId = JSON.parse(localStorage.getItem("cardListId"));
      console.log({ cardListId });

      axios.post("/api/cardList/update", { state, cardListId });

      return state;
    case "getAllCardList":
      state = action.value;
      return state;
    default:
      return state;
  }
};

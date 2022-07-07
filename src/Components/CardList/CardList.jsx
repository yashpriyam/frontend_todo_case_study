import React, { useContext } from "react";
import uuid from "react-uuid";
import { AppStateContext } from "../../AppState/appState.context";
import { TaskCard } from "../TaskCard/TaskCard";
import "./cardList.css";

export const CardList = ({ cardlist, cardlistIdx }) => {
  const { cards, title } = cardlist;
  const { cardListStateAndDispatch } = useContext(AppStateContext);

  const [appState, dispatch] = cardListStateAndDispatch;
  const updatedState = [...appState];

  const handleCardAdd = () => {
    updatedState[cardlistIdx].cards.push({
      id: uuid(), // replace this with current user id
      title: "",
      description: "",
    });
    dispatch({ type: "addCard", value: updatedState });
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, cardlist) => {
    const cardInsIdx = e.dataTransfer.getData("cardIdx");
    const cardlistInsIdx = e.dataTransfer.getData("cardListIdx");
    let insIdx = updatedState.findIndex(
      (listObj) => listObj.id === cardlist.id
    );
    insIdx = insIdx === -1 ? 0 : insIdx;
    updatedState[insIdx].cards.unshift(
      updatedState[cardlistInsIdx].cards[cardInsIdx]
    );

    updatedState[cardlistInsIdx].cards.splice(cardInsIdx, 1);
    dispatch({ type: "moveTask", value: updatedState });
  };

  return (
    <div
      className="card-list"
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, cardlist)}>
      <div>{title}</div>

      <span className="card-number">
        {updatedState[cardlistIdx].cards.length}
      </span>
      <div className="card-list-container">
        {cards.map((card, cardIdx, arr) => (
          <TaskCard
            key={card.id}
            card={card}
            cardIdx={cardIdx}
            cardlistIdx={cardlistIdx}
          />
        ))}
      </div>
      <button className="card-add-btn" onClick={handleCardAdd}>
        Add New Card
      </button>
    </div>
  );
};

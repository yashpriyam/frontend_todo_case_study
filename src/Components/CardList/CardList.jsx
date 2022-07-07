import React, { useContext } from "react";
import uuid from "react-uuid";
import { AppStateContext } from "../../AppState/appState.context";
import { TaskCard } from "../TaskCard/TaskCard";
import "./cardList.css";

export const CardList = ({ cardlist, cardlistIdx }) => {
  const { cards, title } = cardlist;
  const { cardListStateAndDispatch, authenticateStateAndDispatch } =
    useContext(AppStateContext);

  const [appState, dispatch] = cardListStateAndDispatch;
  const updatedState = [...appState];

  const [authState] = authenticateStateAndDispatch;

  const { id: userId } = JSON.parse(authState);
  console.log({ userId });

  const handleCardAdd = () => {
    updatedState[cardlistIdx].cards.push({
      id: userId, // replace this with current user id
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
      <div className="adjust-content">
        <h4 className="to-do">{title}</h4>
        <span className="card-number">
          {updatedState[cardlistIdx].cards.length}
        </span>
      </div>

      <button className="add-button" onClick={handleCardAdd}>
        <p className="button-color">+</p>
      </button>

      <div className="card-list-container">
        {cards.map((card, cardIdx, arr) => (
          <TaskCard
            key={cardIdx}
            card={card}
            cardIdx={cardIdx}
            cardlistIdx={cardlistIdx}
          />
        ))}
      </div>
    </div>
  );
};

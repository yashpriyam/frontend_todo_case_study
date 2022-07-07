import { useContext } from "react";
import { AppStateContext } from "../../AppState/appState.context";
import "./taskCard.css";

export const TaskCard = ({ card, cardIdx, cardlistIdx }) => {
  const { title, description } = card;
  const { cardListStateAndDispatch } = useContext(AppStateContext);
  const [appState, dispatch] = cardListStateAndDispatch;
  const updatedState = [...appState];
  const handleCardRemove = () => {
    updatedState[cardlistIdx].cards.splice(cardIdx, 1);
    dispatch({ type: "removeCard", value: updatedState });
  };

  const handleCardInput = (e) => {
    updatedState[cardlistIdx].cards[cardIdx][e.target.name] = e.target.value;
    dispatch({ type: "cardInput", value: updatedState });
  };

  const onDragStart = (e, taskObj) => {
    e.dataTransfer.setData("obj", taskObj.id);
    e.dataTransfer.setData("cardIdx", cardIdx);
    e.dataTransfer.setData("cardListIdx", cardlistIdx);
  };
  return (
    <div
      className="task-card"
      onDragStart={(e) => onDragStart(e, card)}
      draggable>
      <br></br>
      <input
        name="title"
        onChange={handleCardInput}
        className="task-title"
        value={title}
        placeholder="Give your task a title"
      />
      <br></br>
      <textarea
        rows="4"
        cols="15"
        name="description"
        onChange={handleCardInput}
        className="task-description"
        value={description}
        placeholder="Description..."></textarea>
      <br></br>
      {/* <button className="card-remove-btn" onClick={handleCardRemove}>
        Remove Card
      </button> */}
    </div>
  );
};

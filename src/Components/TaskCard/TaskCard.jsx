import { useContext, useEffect, useState } from "react";
import { AppStateContext } from "../../AppState/appState.context";
import useHttp from "../../helpers/customHooks/useHttp";
import "./taskCard.css";

export const TaskCard = ({ card, cardIdx, cardlistIdx }) => {
  const { sendRequest } = useHttp();

  const { id: userId, title, description } = card;
  const { cardListStateAndDispatch, authenticateStateAndDispatch } =
    useContext(AppStateContext);
  const [appState, dispatch] = cardListStateAndDispatch;

  const [userData, setUserData] = useState({});

  useEffect(() => {
    (async () => {
      const response = await sendRequest(`/api/auth/user/${userId}`);
      console.log({ response });
      setUserData(response.data);
    })();
  }, []);

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

      <div className={`avatar-icon ex-small`}>
        {/* {true ? (
          <img
            src="https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916__340.png"
            alt="profile image"
            className={`avatar-image ex-small`}
          />
        ) : (
          <i className="fas fa-user" />
        )} */}
        {userData && userData.name && userData.avatar_color && (
          <div
            className={`avatar-image ex-small`}
            style={{ backgroundColor: userData.avatar_color }}>
            {userData.name.toLocaleUpperCase().at(0)}
          </div>
        )}
      </div>

      {/* <button className="card-remove-btn" onClick={handleCardRemove}>
        Remove Card
      </button> */}
    </div>
  );
};

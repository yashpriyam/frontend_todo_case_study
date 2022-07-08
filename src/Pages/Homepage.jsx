import { useContext, useEffect, useState } from "react";
import { AppStateContext } from "../AppState/appState.context";
import { CardList } from "../Components/CardList/CardList.jsx";
import "./Homepage.css";
import axios from "axios";

const HomePage = () => {
  const { cardListStateAndDispatch } = useContext(AppStateContext);
  const [appState, dispatch] = cardListStateAndDispatch;

  const [cardListData, setCardListData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/cardList");

      localStorage.setItem("cardListId", JSON.stringify(response.data._id));

      setCardListData(response.data.cardList);

      dispatch({ type: "getAllCardList", value: response.data.cardList });
    })();
  }, [dispatch]);

  // console.log({ cardListData });

  return (
    <div className="homepage-container">
      <div className="cardlist-container">
        {appState.length > 0 &&
          cardListData.length > 0 &&
          cardListData.map((cardlist, cardlistIdx) => (
            <CardList
              key={cardlist.id}
              cardlist={cardlist}
              cardlistIdx={cardlistIdx}
            />
          ))}
      </div>
    </div>
  );
};

export default HomePage;

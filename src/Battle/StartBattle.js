// import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { battle } from "../api";
import PlayerPreview from "./PlayerPreview";
const StartBattle = (props) => {
  const [playerPreview, setPlayerPreview] = useState([]);
  const [myQueryParams, setMyQueryParams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    const arrForQuery = [];
    for (let [name, value] of queryParams) {
      arrForQuery.push(value);
    }
    setMyQueryParams(arrForQuery);
    setLoading(true);
  }, []);

  useEffect(() => {
    battle(myQueryParams)
      .then((players) => {
        setPlayerPreview(players);
      })
      .then((data) => setLoading(false))
      .catch((error) => setError(error));
  }, [myQueryParams]);

  return (
    <>
      {loading ? <h2>Wait...</h2> : null}
      {!error ? null : <h3>{error}</h3>}
      <div className="row">
        {playerPreview.map((item, index) => {
          return (
            <PlayerPreview
              avatar={item.profile.login}
              winner={index === 0 ? "Winner" : "Loser"}
              profile={item.profile}
              scope={item.scope}
            />
          );
        })}
      </div>
    </>
  );
};
export default StartBattle;

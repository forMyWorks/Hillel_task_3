import { useState } from "react";
import { Link } from "react-router-dom";

import PlayerInput from "./PlayerInput";
import PlayerPreview from "./PlayerPreview";

const playerPreview = (
  avatar,
  setShowPlayerPreview,
  battleReady,
  setBattleReady,
  index
) => (
  <PlayerPreview
    avatar={avatar}
    setShowPlayerPreview={setShowPlayerPreview}
    setBattleReady={setBattleReady}
    battleReady={battleReady}
    index={index}
  />
);

const effective = {
  username: "username",
  label: "Player",
  render: playerPreview,
};

const Battle = () => {
  const [data, setData] = useState([effective, effective]);

  const [battleReady, setBattleReady] = useState([false, false]);
  const [result, setResult] = useState([]);
  const addPlayer = () => {
    setData([...data, effective]);
    setBattleReady([...battleReady, false]);
  };
  const deletePlayer = () => {
    setData([...data].slice(0, -1));
    setBattleReady([...battleReady].slice(0, -1));
  };
  const onResult = () => {
    return result
      .reduce(
        (accumulator, item, index) =>
          accumulator + `player${index + 1}=${item}&`,
        "?"
      )
      .slice(0, -1);
  };
  return (
    <>
      <div className="row">
        {data.map((item, index) => (
          <PlayerInput
            key={index}
            username={item.username + (index + 1)}
            label={item.label + " " + (index + 1)}
            render={item.render}
            battleReady={battleReady}
            setBattleReady={setBattleReady}
            index={index}
            result={result}
            setResult={setResult}
          />
        ))}
      </div>
      <div className="row add-del">
        {battleReady.includes(false) && (
          <button className="button" onClick={addPlayer}>
            Add Player
          </button>
        )}

        {battleReady.includes(false) && data.length > 2 ? (
          <button className="button" onClick={deletePlayer}>
            Delete Player
          </button>
        ) : null}
        {battleReady.includes(false) ? null : (
          <Link to={{ pathname: "/battle/results", search: onResult() }}>
            <button className="button bat">Battle</button>
          </Link>
        )}
      </div>
    </>
  );
};
export default Battle;

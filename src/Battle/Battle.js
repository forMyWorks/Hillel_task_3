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

const battleR = { battle: false };

const Battle = () => {
  const [data, setData] = useState([effective, effective]);
  const [battleReady, setBattleReady] = useState([battleR, battleR]);
  const addPlayer = () => {
    setData([...data, effective]);
    setBattleReady([...battleReady, battleR]);
  };
  const deletePlayer = () => {
    setData([...data].slice(0, -1));
    setBattleReady([...battleReady].slice(0, -1));
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
          />
        ))}
      </div>
      <div className="row add-del">
        {battleReady.map((item) => item.battle).includes(false) && (
          <button className="button" onClick={addPlayer}>
            Add Player
          </button>
        )}

        {battleReady.map((item) => item.battle).includes(false) &&
        data.length > 2 ? (
          <button className="button" onClick={deletePlayer}>
            Delete Player
          </button>
        ) : null}
        {battleReady.map((item) => item.battle).includes(false) ? null : (
          <Link to="/battle/results">
            <button className="button bat">Battle</button>
          </Link>
        )}
      </div>
    </>
  );
};
export default Battle;

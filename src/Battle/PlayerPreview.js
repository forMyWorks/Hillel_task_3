import { useState } from "react";

const PlayerPreview = ({
  avatar,
  setShowPlayerPreview,
  setBattleReady,
  battleReady,
  index,
}) => {
  const [reset, setReser] = useState(false);

  return (
    <>
      {reset ? null : (
        <div className="column">
          <img
            className="avatar"
            src={`https://github.com/${avatar}.png?size=200`}
            alt="Avatar"
          />
          <h2>{avatar}</h2>
          <button
            className="button"
            onClick={() => {
              setReser(true);
              setShowPlayerPreview(false);
              setBattleReady([
                ...battleReady.slice(0, index),
                { battle: false },
                ...battleReady.slice(index, -1),
              ]);
            }}
          >
            Reset
          </button>
        </div>
      )}
    </>
  );
};

export default PlayerPreview;

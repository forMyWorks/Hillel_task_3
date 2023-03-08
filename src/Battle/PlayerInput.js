import { useState } from "react";

const PlayerInput = ({
  username,
  label,
  render,
  battleReady,
  setBattleReady,
  index,
  result,
  setResult,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showPlayerPreview, setShowPlayerPreview] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const form = (
    <form className="column" onSubmit={handleSubmit}>
      <label className="header" htmlFor={username}>
        {label}
        <input
          id={username}
          placeholder="Github Username"
          type="text"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
      </label>
      <button
        className="button"
        disabled={!inputValue}
        onClick={() => {
          setShowPlayerPreview(true);

          setBattleReady([
            ...battleReady.slice(0, index),
            true,
            ...battleReady.slice(index, -1),
          ]);
          const res = [...result];
          res[index] = inputValue;
          setResult(res);
        }}
      >
        Submit
      </button>
    </form>
  );

  return (
    <>
      {showPlayerPreview
        ? render(
            inputValue,
            setShowPlayerPreview,
            battleReady,
            setBattleReady,
            index
          )
        : form}
    </>
  );
};
export default PlayerInput;

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
const Search = ({ onChangeSearch }) => {
  // timeout - needed just for implementation debounce
  const [timeout, setMyTimeout] = useState();

  // inputValue - needed just for display input
  const [searchParams, setSearchParams] = useSearchParams({ search: "" });
  const [inputValue, setInputValue] = useState(searchParams.get("search"));

  const onEscape = (event) => {
    if (event.code === "Escape") {
      onChangeSearch("");
      setInputValue("");
      document.removeEventListener("keydown", onEscape);
    }
  };
  document.addEventListener("keydown", onEscape);

  useEffect(() => {
    onChangeSearch(searchParams.get("search"));
  }, []);

  const onMyChange = (event) => {
    setInputValue(event.target.value.replace(/\W|\d/g, ""));
    clearTimeout(timeout);
    setMyTimeout(
      setTimeout(() => {
        searchParams.set("search", event.target.value.replace(/\W|\d/g, ""));
        setSearchParams(searchParams);
        onChangeSearch(event.target.value.replace(/\W|\d/g, ""));
        console.log(searchParams.get("search"), "onMyChange");
      }, 2000)
    );
    // clearTimeout(timeout);
  };

  return (
    <>
      <input
        className="input-search"
        value={inputValue}
        onChange={onMyChange}
        placeholder="Search..."
      />
    </>
  );
};
export default Search;

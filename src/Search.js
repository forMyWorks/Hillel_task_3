import { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
// import debounce from "debounce";

const Search = ({ reposFilter, onChangeSearch }) => {
  useEffect(() => {
    return () => onChangeSearch("");
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => onChangeSearch(value), delay || 500);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [value, delay]);

  const onEscape = (event) => {
    if (event.code === "Escape") {
      onChangeSearch("");
      document.removeEventListener("keydown", onEscape);
    }
  };
  document.addEventListener("keydown", onEscape);

  // const [searchTerm, setSearchTerm] = useState("");
  // const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setDebouncedSearchTerm(reposFilter);
  //   }, 5000); // set the delay time in ms
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [reposFilter]);

  return (
    <input
      className="input-search"
      value={reposFilter}
      // debounceTimeout={300}
      // onChange={debounce(async (event) => {
      //   await onChangeSearch(event.target.value.replace(/\W|\d/g, ""));
      //   console.log(event.target);
      // }, 1000)}

      onChange={(event) =>
        onChangeSearch(event.target.value.replace(/\W|\d/g, ""))
      }
      placeholder="Search..."
      // replace(/\d|[А-Я]|[а-я]|і|І/g, "")  .replace(/\W|\d/g, "")
    />
  );
};
export default Search;

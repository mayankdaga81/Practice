import { useEffect, useRef, useState } from "react";
import gstyles from "../../styles/App.module.css";
import styles from "./SearchFocus.module.css";

function SearchFocus() {
  const [searchTerm, setSearchTerm] = useState("");
  const prevSearchRef = useRef("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.backgroundColor = "yellow";
    }
  }, []);

  useEffect(() => {
    prevSearchRef.current = searchTerm;
  }, [searchTerm]);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <div className={gstyles.container}>
      <div className={`${styles.body}`}>
        <label>Search the Item: </label>
        <input
          type="text"
          value={searchTerm}
          ref={inputRef}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button onClick={handleClick}>Select the Search Box</button>
      </div>
      <div className={gstyles.container}>
        {/* eslint-disable-next-line react-hooks/refs */}
        <div>Previous: {prevSearchRef.current}</div>
        <div>Current: {searchTerm}</div>
      </div>
    </div>
  );
}

export default SearchFocus;

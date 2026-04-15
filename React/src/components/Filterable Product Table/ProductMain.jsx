import ProductTable from "./ProductTable";
import styles from "./ProductMain.module.css";
import { useState } from "react";
import { useEffect } from "react";

// We have implemented the Hydartion effect here. Which is we have saved few data in the browser, which is helping us to retain few UI states. We will use the localStorage object to achieve this.
// The benefit of doing this is, if the user refreshes the page by mistake, it will save all the filter which the user has implemented so that they do not have to start again.
// Another benefit of using this is that, if the user opens up in a new page, they will not have to invets time again, and the browser will show them the same filter which they implemented before.

function ProductMain() {
  // Step 2 - We will local the saved values from the browser on mount, every tiem this component is being rendered.
  // If we find any values there, then we will use that in the state as the default values, if not, then we will use null or mepty as teh default value which was the older case.
  const [name, setName] = useState(() => {
    const nameFromBrowser = localStorage.getItem("nameFilter");
    return nameFromBrowser ? nameFromBrowser : "";
  });

  // In case of comple objects, we have to parse it, as we stored ther values in the form of string in the local storage.
  const [isAvailiale, setIsAvailiable] = useState(() => {
    const isAvailiableFromBrowser = JSON.parse(
      localStorage.getItem("isAvailiableFilter"),
    );
    return isAvailiableFromBrowser ? isAvailiableFromBrowser : false;
  });

  // Step 1 - Whenever there is any chnage in name or isAvailiable filter, we will store it in the localStorage.
  // LocalStorage only accepts strings, so in case of complex objects, we have to convert them into string before saving
  useEffect(() => {
    localStorage.setItem("nameFilter", name);
    localStorage.setItem("isAvailiableFilter", JSON.stringify(isAvailiale));
  }, [name, isAvailiale]);

  return (
    <div className={styles.container}>
      {/* Filters */}
      <div className={`${styles.filterOptions} `}>
        <input
          type="text"
          placeholder="Enter the name to search..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.inputTextBox}
        ></input>

        <div className={`${styles.displayFlex}`}>
          <label>Display availiable items</label>
          <input
            type="checkbox"
            checked={isAvailiale}
            onChange={(e) => setIsAvailiable(e.target.checked)}
          ></input>
        </div>
      </div>

      {/* Product Table */}
      <ProductTable name={name} availiable={isAvailiale} />
    </div>
  );
}

export default ProductMain;

import ProductTable from "./ProductTable";
import styles from "./ProductMain.module.css";
import { useState } from "react";

function ProductMain() {
  const [name, setName] = useState("");
  const [isAvailiale, setIsAvailiable] = useState(false);
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

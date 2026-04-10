import { useState } from "react";
import styles from "./DynamicList.module.css";

function DynamicList() {
  const [field, setField] = useState("");
  const [listData, setListData] = useState([]);
  const [count, setCount] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    const now = new Date();

    field.length > 0 &&
      setListData([...listData, { count, field, date: now.toLocaleString() }]);
    setField("");
    setCount(() => count + 1);
  }

  function handleDeletion(itemCount) {
    const newList = listData.filter((item) => item.count !== itemCount);
    setListData(newList);
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {/* Form code  */}
        <form
          className={styles.formContainer}
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            className={styles.inputBox}
            placeholder="Enter the item..."
            value={field}
            onChange={(e) => setField(e.target.value)}
          ></input>
          <button type="submit" className={styles.button}>
            Add
          </button>
        </form>

        {/* Table code */}
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Item</th>
              <th>Creation Date</th>
              <th>Remove Item</th>
            </tr>
          </thead>
          <tbody>
            {listData.map((item) => (
              <tr key={item.count}>
                <td>{item.count}</td>
                <td>{item.field}</td>
                <td>{item.date}</td>
                <td
                  className={styles.removeItem}
                  onClick={() => handleDeletion(item.count)}
                >
                  X
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DynamicList;

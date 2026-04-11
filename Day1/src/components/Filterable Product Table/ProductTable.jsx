import { PRODUCTS as products } from "./Product";
import styles from "./ProductTable.module.css";

function ProductTable({ name, availiable }) {
  let itemList = products.filter((item) =>
    item.name.toLowerCase().includes(name.toLowerCase()),
  );
  itemList = availiable
    ? itemList.filter((item) => item.stocked === true)
    : itemList;

  return (
    <div className={styles.container}>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Category</th>
            <th>Name</th>
            <th>Price</th>
            <th>Availiable</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.category}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.stocked ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;

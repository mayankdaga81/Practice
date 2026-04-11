import { useMemo } from "react";
import { PRODUCTS as products } from "./Product";
import styles from "./ProductTable.module.css";

/**
 * KEY STABILITY & PERFORMANCE NOTES:
 *
 * * 1. Why not index?
 * Using array index as a key fails when filtering or sorting; React
 * loses track of which specific item moved where.
 *
 * * 2. Why not inline random IDs?
 * Calling crypto.randomUUID() inside .map() generates NEW IDs every
 * single render. React thinks the entire list is new, causing it to
 * destroy and recreate the DOM (slow performance & loss of state).
 *
 * * 3. The "Pure Function" Trap:
 * Even if added inside the component body, random IDs refresh on
 * every re-render (e.g., as the user types). The identity must be stable.
 *
 * * 4. The Solution (useMemo):
 * Wrapping the ID generation in useMemo with an empty dependency
 * array [] ensures IDs are created ONLY ONCE when the component
 * mounts. This provides a stable, unique "identity" for React to
 * track items efficiently during filtering.
 */

function ProductTable({ name, availiable }) {
  let productListwithId = useMemo(() => {
    return products.map((item) => ({
      ...item,
      id: crypto.randomUUID(),
    }));
  }, []);

  let itemList = productListwithId.filter(
    (item) =>
      item.name.toLowerCase().includes(name.toLowerCase()) &&
      (!availiable || item.stocked),
  );

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
            <tr key={item.id}>
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

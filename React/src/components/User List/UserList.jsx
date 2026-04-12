import { useEffect } from "react";
import gstyles from "../../App.module.css";
import { useState } from "react";
import Loader from "../Loader/Loader";
import ErrorPage from "../ErrorPage/ErrorPage";

function UserList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );

        if (!response.ok) {
          throw new Error(`HTTP Error!, Status: ${response.status}`);
        }
        const result = await response.json();

        setData(result);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error, " - found while fetching.");
      }
    }

    fetchUsers();
  }, []);

  function resolveAddress({ street, suite, city, zipcode }) {
    return suite + ", " + street + ", " + city + ", " + zipcode;
  }

  return (
    <div className={gstyles.container}>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorPage />
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Company Name</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.company.name}</td>
                <td>{resolveAddress(item.address)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;

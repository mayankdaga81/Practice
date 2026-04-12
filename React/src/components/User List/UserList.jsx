import { useEffect } from "react";
import gstyles from "../../App.module.css";
import { useState } from "react";
import Loader from "../Loader/Loader";
import ErrorPage from "../ErrorPage/ErrorPage";

function UserList() {
  // Having 3 states like this is industry standard, and we must follow this approach only.
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // We have added AbortCOntroller here, which is important because it prevents memoory leak.
    // Suppose, user opens the page, but closes te component, and now the component is unmounted, but the API call is still in progress which later will try to update a state which does not even exist, and this can lead to app crsh.
    // There, with AbortController, we will abort the API call which is in progress and then this will avoid any such scenerio of memory leak.
    const controller = new AbortController();

    async function fetchUsers() {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`HTTP Error!, Status: ${response.status}`);
        }
        const result = await response.json();

        setData(result);
        setLoading(false);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch call aborted!");
        } else {
          setError(true);
          setLoading(false);
          console.log(error, " - found while fetching.");
        }
      }
    }

    fetchUsers();

    return () => {
      // This is the most important part in case of controller as this informs the browser that this component has been unmounted, ther eis no point of making the APIO call, you can ignore that.
      controller.abort();
      console.log("Cleanup: Fetch aborted because component unmounted");
    };
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

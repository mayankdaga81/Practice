import gstyles from "../../styles/App.module.css";
import Loader from "../Loader/Loader";
import ErrorPage from "../ErrorPage/ErrorPage";
import useFetch from "../../hooks/useFetch.js";

// On day3, we implemented the API call directly in this file, and on Day4, what we did is we created our own cusotom hook for making API calls, and instead of writing the big API call, we will now import this and this will give us the result in just 1 line, so much more cleaner code, and the API call now is more reusable.

function UserList() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users",
  );

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

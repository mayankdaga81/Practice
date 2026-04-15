import { useState, useEffect } from "react";

function useFetch(url) {
  // Having 3 states like this is industry standard, and we must follow this approach only.
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // We have added AbortController here, which is important because it prevents memoory leak.
    // Suppose, user opens the page, but closes te component, and now the component is unmounted, but the API call is still in progress which later will try to update a state which does not even exist, and this can lead to app crash.
    // There, with AbortController, we will abort the API call which is in progress and then this will avoid any such scenerio of memory leak.
    const controller = new AbortController();

    async function fetchUsers() {
      setLoading(true);
      try {
        const response = await fetch(url, { signal: controller.signal });

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
      // This is the most important part in case of controller as this informs the browser that this component has been unmounted, there is no point of making the API call, you can ignore that.
      // In simple language, we have to abort any API call when the component is being unmounted, and when the component will be unmounted, this clean up function will be triggered again, so it will work as we wanted this to work.

      // Bonus Note: The cleanup function doesn't *only* run when the component unmounts.
      // It also runs right before the useEffect executes again due to a dependency change (like `url` changing).
      // This automatically cancels the previous API call, protecting the app from **race conditions** if the URL changes rapidly!
      controller.abort();
      console.log("Cleanup: Fetch aborted because component unmounted");
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;

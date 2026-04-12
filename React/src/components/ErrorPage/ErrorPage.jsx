import gstyles from "../../styles/App.module.css";

function ErrorPage() {
  return (
    <div className={gstyles.container}>
      Opps! Something went wrong. Please try again later.
    </div>
  );
}

export default ErrorPage;

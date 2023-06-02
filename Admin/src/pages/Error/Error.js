import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  return (
    <div>
      <h1>Error page</h1>
      <p>{error.message || error.statusText}</p>
    </div>
  );
}
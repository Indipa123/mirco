import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page not-found">
      <h1>Page not found</h1>
      <p>The marketplace route you requested does not exist.</p>
      <Link className="primary-button" to="/">Back to marketplace</Link>
    </div>
  );
}

import "./index.css";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
      alt="not found"
      className="not-found-img"
    />
    <p className="failure-description">Page Not Found</p>
    <Link to="/" className="failure-back-button">
      Back
    </Link>
  </div>
);

export default NotFound;

import React from "react";
import { Link } from "react-router-dom";

function Four04() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Bcak to Home</Link>
    </div>
  );
}

export default Four04;

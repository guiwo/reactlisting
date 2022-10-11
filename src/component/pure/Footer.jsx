import React from "react";

const Footer = () => {
  return (
    <footer
      className="footer mt-auto py-3 bg-light"
      style={{ backgroundColor: "red", position: "sticky", width: "100%" }}
    >
      <div className="container">
        <span className="text-muted">Place sticky footer content here.</span>
      </div>
    </footer>
  );
};

export default Footer;

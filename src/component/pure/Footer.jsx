import React from "react";

const Footer = ({ footerText }) => {
  const date = new Date();

  const year = date.getFullYear();

  return (
    <footer
      className="footer py-3 bg-light"
      style={{ backgroundColor: "red", width: "100%" }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        <span>{year} </span>
        <span>
          {footerText === "weatherPage" ? (
            <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
          ) : null}
        </span>
      </div>
    </footer>
  );
};

export default Footer;

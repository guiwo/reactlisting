import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HomePage from "./pages/home/HomePage";
import NotFoundPage from "./pages/404/NotFoundPage";
import AboutPage from "./pages/about-faqs/AboutPage";
import PersonList from "./component/container/PersonList";
import Footer from "./component/pure/Footer";
import WeatherList from "./component/container/WeatherList";

function App() {
  const [renderedPage, setRenderedPage] = useState("");

  function footerTextHandle(event) {
    console.log("e.name", event);
    switch (event.target.name) {
      case "randomPerson":
        setRenderedPage("randomPerson");
        break;
      case "personList":
        setRenderedPage("personList");
        break;
      case "weatherPage":
        setRenderedPage("weatherPage");
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    //  add class to body element
    document.body.classList.add("d-flex", "flex-column", "h-100");
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <BrowserRouter>
          <menu className="col-md-2 d-flex flex-column flex-shrink-0 pl-3 pt-5 bg-light">
            <ul className="nav flex-column">
              <li className="nav-item">
                <button
                  name="randomPerson"
                  className="nav-link btno"
                  onClick={(event) => footerTextHandle(event)}
                >
                  <Link name="randomPerson" to="/">Random person finder</Link>
                </button>
              </li>
              <li className="nav-item">
                <button
                  name="personList"
                  className="nav-link btno"
                  onClick={(event) => footerTextHandle(event)}
                >
                  <Link name="personList" to="/personlist">Person list manager</Link>
                </button>
              </li>
              <li className="nav-item">
                <button
                  name="weatherPage"
                  className="nav-link btno"
                  onClick={(event) => footerTextHandle(event)}
                >
                  <Link name="weatherPage" to="/weather">Weather</Link>
                </button>
              </li>
            </ul>
          </menu>
          <main className="col-md-10 ml-sm-auto col-lg-10 pt-3">
            <Routes>
              {/* HomePage */}
              <Route exact path="/" element={<HomePage />} />

              {/* Different paths to the same end (PersonList) */}
              {["/personlist", "/listperson"].map((path, index) => (
                <Route key={index} path={path} element={<PersonList />} />
              ))}

              <Route exact path="/weather" element={<WeatherList />} />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
      <Footer footerText={renderedPage}></Footer>
    </div>
  );
}

export default App;

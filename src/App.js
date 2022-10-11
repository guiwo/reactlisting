import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NotFoundPage from "./pages/404/NotFoundPage";
import AboutPage from "./pages/about-faqs/AboutPage";
import PersonList from "./component/container/PersonList";

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <BrowserRouter>
          <menu className="col-md-2 d-flex flex-column flex-shrink-0 p-2 bg-light">
            <ul className="nav flex-column">
              <li className="nav-item">
                <button className="nav-link btno">
                  <Link to="/">|| Home ||</Link>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btno">
                  <Link to="/personlist">Person list manager</Link>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btno">
                  <Link to="/about-faqs">|| About ||</Link>
                </button>
              </li>
            </ul>
          </menu>
          <main className="col-md-10 ml-sm-auto col-lg-10 pt-3 px-4">
            <Routes>
              {/* HomePage */}
              <Route exact path="/" element={<HomePage />} />

              {/* Different paths to the same end (PersonList) */}
              {["/personlist", "/listperson"].map((path, index) => (
                <Route key={index} path={path} element={<PersonList />} />
              ))}

              <Route exact path="/about-faqs" element={<AboutPage />} />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

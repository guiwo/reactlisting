import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [apiData, setApiData] = useState();
  const [filter, setFilter] = useState("");
  const [handleCh, setHandleCh] = useState(null);

  //first load from the localstorage
  const [saveObjects, setSaveObjects] = useState(
    JSON.parse(localStorage.getItem("randomPerson")) || []
  );

  //Will load new items that are added after the initial load
  useEffect(() => {
    localStorage.setItem("randomPerson", JSON.stringify(saveObjects));
  }); //[saveObjects] , if it changes, this useeffect works and rerenders

  //Promise goes inside of useEffect so it only executes once:
  useEffect(() => {
    //Promise/async func:
    const getApiData = async () => {
      //"https://randomuser.me/api/?results=12&exc=login&gender=female&seed=foobar"
      //"https://randomuser.me/api/?seed=5b425b6e739949ce"
      const response = fetch(
        "https://randomuser.me/api/?results=500&gender=female&exc=login"
      );
      const data = (await response).json();
      return data;
    };

    getApiData().then((data) => {
      setApiData(data);
    });
  }, []);

  const copy = apiData;
  //console.log(copy);

  function personInsideObjectList(objectList, personName) {
    for (var i = 0; i < objectList.length; i++) {
      if (objectList[i][1].first === personName)
        console.log("fc", objectList[i][1].first);
      return true;
    }
    return false;
  }

  /**
   * Delete the whole input so no old results are shown again
   * @param {*} event
   */
  function deleteInputText(event) {
    const key = event.keyCode || event.charCode;

    if (key === 8 || key === 46) {
      event.target.value = "";
      setFilter("");
      setHandleCh(null);
      setSaveObjects([]);
      console.log(event.target.name);
    }
  }

  const handleChange = (event) => {
    const findItem = event.target.value;
    copy.results.filter((obj) => {
      if (obj.name.first === findItem || obj.name.last === findItem) {
        setFilter(obj.name.first || obj.name.last);
        setHandleCh(obj.name.first || obj.name.last);
        const tempObjects = JSON.parse(localStorage.getItem("randomPerson"));
        tempObjects.push(Object.values(obj));
        localStorage.setItem("randomPerson", JSON.stringify(tempObjects));
        setSaveObjects(tempObjects);
      }
      if (findItem === "") {
        setFilter("");
        setHandleCh(null);
        setSaveObjects([]);
      }
      return [obj.name.first === findItem];
    });
  };
  return (
    <>
      <h1>Home page</h1>
      <input
        placeholder="Search by name/surname"
        type="text"
        name="searchInput"
        onChange={handleChange}
        onKeyDown={deleteInputText}
      />
      {
        //if name has been found, load
        filter === handleCh ? (
          <div className="container">
            <div className="row">
              {
                //if apiData is set, then load the map
                apiData &&
                  saveObjects &&
                  //if the person has been found, map that object,'transform' object to array
                  saveObjects.map((value, index) => {
                    return (
                      <div className="card-deck col-2  p-2" key={index}>
                        <div className="card">
                          <img
                            className="card-img-top"
                            src={value[9].large}
                            alt="Card cap"
                          />
                          <div className="card-body">
                            <p className="card-title">
                              {/*Gets the object THEN stringifies it, then replaces " with blanks*/}
                              {JSON.stringify(value[1].first).replace(
                                /"/g,
                                " "
                              )}
                              {JSON.stringify(value[1].last).replace(/"/g, " ")}
                            </p>
                            <p className="card-text">
                              <b> Address</b>
                              {JSON.stringify(value[2].city).replace(/"/g, " ")}
                              ,
                              {JSON.stringify(value[2].country).replace(
                                /"/g,
                                " "
                              )}
                              <b>Nationality:</b>
                              {JSON.stringify(value[10]).replace(/"/g, " ")}
                            </p>
                          </div>
                          <div className="card-footer">
                            <small className="text-muted">
                              Age:{" "}
                              {JSON.stringify(value[4].age).replace(/"/g, " ")}
                            </small>
                          </div>
                        </div>
                      </div>
                    );
                  })
              }
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="row">
              {
                //if apiData is set, then load the map ( full result )
                apiData &&
                  copy.results.map((value, index) => {
                    return (
                      <div className="card-deck col-2  p-2" key={index}>
                        <div className="card">
                          <img
                            className="card-img-top"
                            src={value.picture.large}
                            alt="Card cap"
                          />
                          <div className="card-body">
                            <p className="card-title">
                              {/*Gets the object THEN stringifies it, then replaces " with blanks*/}
                              {JSON.stringify(value.name.first).replace(
                                /"/g,
                                " "
                              )}
                              {JSON.stringify(value.name.last).replace(
                                /"/g,
                                " "
                              )}
                            </p>
                            <p className="card-text">
                              <b> Address</b>
                              {JSON.stringify(value.location.city).replace(
                                /"/g,
                                " "
                              )}
                              ,
                              {JSON.stringify(value.location.country).replace(
                                /"/g,
                                " "
                              )}
                              <b>Nationality:</b>
                              {JSON.stringify(value.nat).replace(/"/g, " ")}
                            </p>
                          </div>
                          <div className="card-footer">
                            <small className="text-muted">
                              Age:{" "}
                              {JSON.stringify(value.dob.age).replace(/"/g, " ")}
                            </small>
                          </div>
                        </div>
                      </div>
                    );
                  })
              }
            </div>
          </div>
        )
      }
    </>
  );
};

export default HomePage;

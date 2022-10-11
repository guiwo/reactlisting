import React, { useState, createContext, useEffect, useContext } from "react";
import Person from "../pure/Person";
import PersonFormFormik from "../pure/form/PersonFormFormik";
import Persons from "../../class/Persons.class";

export const PersonContext = createContext();

//Logic is developed in the containers
//id,name, age, birthdate, phone, signupdate, subscription

const PersonList = () => {
  const initPerson = new Persons(
    0,
    "John Doe",
    0,
    "Yesterday",
    "55555555555",
    "55555555555"
  );

  //first load from the localstorage
 const [persons, setPerson] = useState(JSON.parse(localStorage.getItem("personListLocal")) || [initPerson]);

  //Will load new items that are added after the initial load
  useEffect(() => {
    localStorage.setItem("personListLocal", JSON.stringify(persons));
  }, [persons]); //[persons] , if it changes, this useeffect works and rerenders

  /**
   * Se crea un array de personas temporal para no trabajar sobre el original
   * @param {Object} person
   */
  function addPerson(person) {
    try {
      const tempPersons = [...persons];
      tempPersons.push(person);
      setPerson(tempPersons);
    } catch (error) {
      console.error("err addPerson", error);
    }
  }

  /**
   * Se crea un array de personas temporal para no trabajar sobre el original
   * Se recupera el índice del objeto según el array original
   * Se reemplaza sobre la copia oldPerson con editPerson y después se setea
   * @param {Object} person
   */
  function editPerson(editPerson, oldPerson) {
    // console.log("EditPerson -EditPerson- en PersonList", editPerson);
    // console.log("OldPerson en EditPerson en PersonList", oldPerson);
    const tempPersons = [...persons];
    const indexPersonForEdition = persons.indexOf(oldPerson); //editP ==oldperson for now
    tempPersons.splice(indexPersonForEdition, 1, editPerson); //replaced by person
    setPerson(tempPersons);

    console.log("tempPersons-", tempPersons);
  }
  /**
   * Se crea un array de personas temporal para no trabajar sobre el original
   * Se recupera el índice del objeto según el array original
   * Se borra sobre la copia y después se setea
   * @param {Object} person
   */
  function deletePerson(person) {
    const tempPersons = [...persons];
    const indexPersonForDeletion = persons.indexOf(person);
    tempPersons.splice(indexPersonForDeletion, 1);
    setPerson(tempPersons);
  }

  function changeStatus(status, person) {
    //console.log("changeStatus")

    console.log("status pasado", status);
    console.log("person", person);
    console.log("status actual", person.subscription);

    const tempPersons = [...persons];
    const indexPersonForStatusUpdate = persons.indexOf(person);

    console.log("indexPersonForStatusUpdate", indexPersonForStatusUpdate);

    switch (status) {
      case "inactive":
        tempPersons[indexPersonForStatusUpdate].subscription = "inactive";

        setPerson(tempPersons);

        break;
      case "active":
        tempPersons[indexPersonForStatusUpdate].subscription = "active";

        setPerson(tempPersons);
        break;
      case "pending":
        tempPersons[indexPersonForStatusUpdate].subscription = "pending";

        setPerson(tempPersons);
        break;

      default:
        break;
    }
  }

  return (
    <PersonContext.Provider value={persons}>
      <div className="container">
        <div className="row">
          <div className="col-3 p-4">
            <PersonFormFormik add={addPerson}></PersonFormFormik>
          </div>
          <div className="col-9 p-4">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">Birthdate</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Signup date</th>
                  <th scope="col">Subscription status</th>
                  <th scope="col">Edit / Delete</th>
                  <th scope="col">Change status</th>
                </tr>
              </thead>
              {persons
                ? persons.map((person, index) => {
                    return (
                      <Person
                        key={index}
                        person={person}
                        remove={deletePerson}
                        change={changeStatus}
                        editt={editPerson}
                        removve={deletePerson}
                      ></Person>
                    );
                  })
                : null}
            </table>
          </div>
        </div>
      </div>
    </PersonContext.Provider>
  );
};

export default PersonList;

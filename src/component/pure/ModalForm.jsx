import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { SUBSCRIPTION } from "../../class/Subscription.enum";
import Persons from "../../class/Persons.class";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "black",
};

const ModalForm = ({ showModal, setShowModal, person, edit }) => {
  //This will keep the previous data from disappearing if there are no changes in data
  const [formValue, setFormValue] = useState({
    nameForm: person.name,
    ageForm: person.age,
    signForm: person.signupdate,
    phoneForm: person.phone,
    birthForm: person.birthdate,
  });

  const handleChange = (event) => {
    //input names name="xxx"
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  //input names
  const { nameForm, ageForm, signForm, phoneForm, birthForm } = formValue;

  //Refs for inputs
  const nameRef = useRef("");
  const ageRef = useRef("");
  const birthdateRef = useRef("");
  const phoneRef = useRef("");
  const signupdateRef = useRef("");
  const subscriptionRef = useRef(SUBSCRIPTION.PENDING);

  function editPerson(e, person) {
    setShowModal((prev) => !prev);
    e.preventDefault();

    const editP = new Persons(
      person.id,
      nameRef.current.value,
      ageRef.current.value,
      birthdateRef.current.value,
      phoneRef.current.value,
      signupdateRef.current.value,
      subscriptionRef.current.value
    );
    edit(editP, person); // editedPerson +oldPerson
    // console.log("oldPerson", person);
    //console.log("editPerson",editP);
  }

  return (
    <>
      {showModal ? (
        <Box sx={style} /*showModal={showModal}*/>
          <button onClick={() => setShowModal((prev) => !prev)}>X</button>
          <form className="container" onSubmit={(e) => editPerson(e, person)}>
            <div className="col p-2">
              <div className="row m-1">
                <label htmlFor="nameForm" className="form-label">
                  Name
                </label>
                <input
                  name="nameForm"
                  placeholder={person.name}
                  id="nameForm"
                  type="text"
                  ref={nameRef}
                  onChange={handleChange}
                  value={nameForm}
                />
              </div>

              <div className="row m-1">
                <label htmlFor="ageForm" className="form-label">
                  Age
                </label>
                <input
                  name="ageForm"
                  placeholder={person.age}
                  id="ageForm"
                  type="number"
                  ref={ageRef}
                  onChange={handleChange}
                  value={ageForm}
                />
              </div>

              <div className="row m-1">
                <label htmlFor="birthForm" className="form-label">
                  Birthdate
                </label>
                <input
                  name="birthForm"
                  placeholder={person.birthdate}
                  id="birthForm"
                  type="text"
                  onChange={handleChange}
                  ref={birthdateRef}
                  value={birthForm}
                />
              </div>

              <div className="row m-1">
                <label htmlFor="phoneForm" className="form-label">
                  Phone
                </label>
                <input
                  name="phoneForm"
                  placeholder={person.phone}
                  id="phoneForm"
                  type="text"
                  onChange={handleChange}
                  ref={phoneRef}
                  value={phoneForm}
                />
              </div>

              <div className="row m-1">
                <label htmlFor="signForm" className="form-label">
                  Signup date
                </label>
                <input
                  name="signForm"
                  placeholder={person.signupdate}
                  id="signForm"
                  type="text"
                  onChange={handleChange}
                  ref={signupdateRef}
                  value={signForm}
                />
              </div>

              <div className="row m-1">
                <label htmlFor="subForm" className="form-label">
                  Subscription status
                </label>
                <select
       
                  className="col m-1"
                  id="subForm"
                  ref={subscriptionRef}
                  defaultValue={person.subscription}
    
                >
                  <option value={SUBSCRIPTION.ACTIVE}>Active</option>
                  <option value={SUBSCRIPTION.INACTIVE}>Inactive</option>
                  <option value={SUBSCRIPTION.PENDING}>Pending</option>
                </select>
              </div>
            </div>

            <button className="btn btn-primary m-3" type="submit">
              Edit client
            </button>
          </form>
        </Box>
      ) : null}
    </>
  );
};

ModalForm.propTypes = {
  edit: PropTypes.func.isRequired,
};

export default ModalForm;

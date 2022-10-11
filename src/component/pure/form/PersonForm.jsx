import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Persons from "../../../class/Persons.class";
import { SUBSCRIPTION } from "../../../class/Subscription.enum";

const PersonForm = ({ add }) => {
  const nameRef = useRef("");
  const ageRef = useRef("");
  const birthdateRef = useRef("");
  const phoneRef = useRef("");
  const signupdateRef = useRef("");
  const subscriptionRef = useRef(SUBSCRIPTION.PENDING);

  let [id, setId] = useState(0);

  function addPerson(e) {
    e.preventDefault();

    id++;
    setId(id);

    const newPerson = new Persons(
      id,
      nameRef.current.value,
      ageRef.current.value,
      birthdateRef.current.value,
      phoneRef.current.value,
      signupdateRef.current.value,
      subscriptionRef.current.value
    );
    add(newPerson);
    //clear all input values in the form
    e.target.reset();
  }

  return (
    <form className="container" onSubmit={addPerson}>
      <div className="col p-2">
        <div className="row m-1">
          <label htmlFor="nameForm" className="form-label">
            Name
          </label>
          <input id="nameForm" type="text" ref={nameRef} />
        </div>

        <div className="row m-1">
          <label htmlFor="ageForm" className="form-label">
            Age
          </label>
          <input id="ageForm" type="number" ref={ageRef} />
        </div>

        <div className="row m-1">
          <label htmlFor="birthForm" className="form-label">
            Birthdate
          </label>
          <input id="birthForm" type="text" ref={birthdateRef} />
        </div>

        <div className="row m-1">
          <label htmlFor="phoneForm" className="form-label">
            Phone
          </label>
          <input id="phoneForm" type="text" ref={phoneRef} />
        </div>

        <div className="row m-1">
          <label htmlFor="signForm" className="form-label">
            Signup date
          </label>
          <input id="signForm" type="text" ref={signupdateRef} />
        </div>

        <div className="row m-1">
          <label htmlFor="subForm" className="form-label">
            Subscription status
          </label>
          <select
            className="col m-1"
            id="subForm"
            ref={subscriptionRef}
            defaultValue={SUBSCRIPTION.PENDING}
          >
            <option value={SUBSCRIPTION.ACTIVE}>Active</option>
            <option value={SUBSCRIPTION.INACTIVE}>Inactive</option>
            <option value={SUBSCRIPTION.PENDING}>Pending</option>
          </select>
        </div>
      </div>

      <button className="btn btn-primary m-3" type="submit">
        Add client
      </button>
    </form>
  );
};

PersonForm.propTypes = {
  add: PropTypes.func.isRequired,
};

export default PersonForm;

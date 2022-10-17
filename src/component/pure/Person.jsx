import React, { useRef, useState, useContext } from "react";
import PropTypes from "prop-types";
import Persons from "../../class/Persons.class";
import { SUBSCRIPTION } from "../../class/Subscription.enum";
import "../../styles/Person.scss";
import ModalForm from "./ModalForm";
import Modal from "./Modal";
import { PersonContext } from "../container/PersonList";

const Person = ({ person, change, editt, removve }) => {
  //Modal edit useState
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  //Modal Confirm to delete useState
  const [showConfirm, setShowConfirm] = useState(false);

  const openConfirmModal = () => {
    setShowConfirm((prev) => !prev);
  };

  /**
   *  Return a badge depending on the subscription status
   * @returns nothing
   */
  function returnSubActiveInactive() {
    const subPerson = person.subscription;

    switch (subPerson) {
      case "active":
        return (
          <span className={"badge bg-success"}>{person.subscription}</span>
        );

      case "inactive":
        return <span className={"badge bg-danger"}>{person.subscription}</span>;
      case "pending":
        return (
          <span className={"badge bg-secondary"}>{person.subscription}</span>
        );

      default:
        break;
    }
  }

  const refSelect = useRef("");

  const context = useContext(PersonContext);

  //console.log("context", context);

  // * Moving logic to upper levels
  function editPersonPrev(editPerson, oldPerson) {
    // console.log("editPersonPrev", editPerson, oldPerson);

    editt(editPerson, oldPerson); //editPerson + old Person
  }

  function removePersonPrev(person) {
    removve(person); //person to delete
  }

  return (
    <tbody>
      <tr
        style={
          person.id % 2 === 0
            ? { backgroundColor: "white" }
            : { backgroundColor: "ghostwhite" }
        }
      >
        <th scope="row">{person.id}</th>
        <td>{person.name}</td>
        <td>{person.age}</td>
        <td>{person.birthdate}</td>
        <td>{person.phone}</td>
        <td>{person.signupdate}</td>
        <td>
          {/* Function will be executed since it has (), direct call */}
          {returnSubActiveInactive()}
        </td>
        <td>
          {}
          <i className="i-trash bi bi-pencil" onClick={openModal}></i>
          <ModalForm
            person={person}
            showModal={showModal}
            setShowModal={setShowModal}
            edit={editPersonPrev}
          />
          {/* <i className="i-trash bi bi-trash" onClick={() => remove(person)}></i> */}
          <i className="i-trash bi bi-trash" onClick={openConfirmModal}></i>
          <Modal
            person={person}
            showConfirm={showConfirm}
            setShowConfirm={setShowConfirm}
            animation={true}
            remove={removePersonPrev}
          />
        </td>
        <td>
          <select
            ref={refSelect}
            defaultValue={1}
            onChange={() => change(refSelect.current.value, person)}
          >
            <option value={1} disabled>
              Change status
            </option>
            <option value={SUBSCRIPTION.ACTIVE}>Active</option>
            <option value={SUBSCRIPTION.INACTIVE}>Inactive</option>
            <option value={SUBSCRIPTION.PENDING}>Pending</option>
          </select>
        </td>
      </tr>
    </tbody>
  );
};

Person.propTypes = {
  person: PropTypes.instanceOf(Persons).isRequired,
  person: PropTypes.instanceOf(Object).isRequired,
  change: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default Person;

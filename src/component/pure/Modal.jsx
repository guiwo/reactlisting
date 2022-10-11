import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalConfirm({ showConfirm, setShowConfirm, person, remove }) {
  function deletePerson(person) {
    console.log("person delete", person);

    remove(person);
    setShowConfirm((prev) => !prev);
  }

  return (
    <>
      {showConfirm ? (
        <Modal show={showConfirm} style={{  fontWeight: "bold" }}>
          <Modal.Header>
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do you want to delete the client {person.name}?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              //onClick={() => setShowConfirm((prev) => !prev)}
              onClick={() => deletePerson(person)}
            >
              Delete client
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
}

//*
export default ModalConfirm;

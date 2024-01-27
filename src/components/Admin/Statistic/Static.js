import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Static({
  isShow,
  title,
  content,
  name,
  handleShowStatic,
  handleEvent,
}) {
  return (
    <Modal
      show={isShow}
      onHide={(e) => {
        handleShowStatic(name);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={(e) => {
            handleShowStatic(name);
          }}
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={(e) => {
            handleEvent();
            console.log("adfae", name);
            handleShowStatic(name);
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Static;

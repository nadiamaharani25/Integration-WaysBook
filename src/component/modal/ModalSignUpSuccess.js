// Import package
import React from "react";
import { Modal } from "react-bootstrap";

export default function ModalSignUpSuccess(props) {
  return (
    <>
      <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body className="text-center">
          <p style={{ color: "#29BD11", fontSize: "21px", fontWeight: "bold" }}>Register success!. Please Login.</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

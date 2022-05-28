// Library
import React from "react";
import { Modal } from "react-bootstrap";

export default function ModalNotSubscribe(props) {
  return (
    <div>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body className="text-center">
          <p style={{ color: "#d60000", fontSize: "24px" }}>Success Add to Your Book List !</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

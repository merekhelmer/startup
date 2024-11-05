// src/components/PreferencesModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const PreferencesModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Select Your Preferences</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Your Mood:</Form.Label>
            <Form.Check type="radio" label="Happy" name="mood" value="happy" />
            <Form.Check type="radio" label="Romantic" name="mood" value="romantic" />
            {/* Add more mood options */}
          </Form.Group>
          <Form.Group>
            <Form.Label>Preferred Genres:</Form.Label>
            <Form.Check type="checkbox" label="Action" value="action" />
            <Form.Check type="checkbox" label="Comedy" value="comedy" />
            {/* Add more genre options */}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" type="submit">
          Save Preferences
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PreferencesModal;

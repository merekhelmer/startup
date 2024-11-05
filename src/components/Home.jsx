// src/components/Home.js
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Home.css';

const Home = () => {
  return (
    <main className="home">
      <section id="session-management">
        <h2>Start Your Movie Night</h2>
        <Form id="session-form">
          <Form.Group className="mb-3">
            <Button variant="primary" type="submit" href="/">
              Create New Session
            </Button>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="session-code">Or Join with a Session Code:</Form.Label>
            <Form.Control
              type="text"
              id="session-code"
              placeholder="e.g., ABC123"
              required
            />
            <Button variant="secondary" type="submit" href="/">
              Join Session
            </Button>
          </Form.Group>
        </Form>
      </section>
    </main>
  );
};

export default Home;

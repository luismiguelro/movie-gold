import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const ReviewForm = ({ handleSubmit, labelText, revText, defaultValue }) => {
  const placeholderOptions = [
    "Leave your review here...",
    "What did you think of the movie?",
    "Share your thoughts with others...",
    "Write your thoughts about the characters...",
    "Share your favorite scenes...",
  ];

  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex(prevIndex => (prevIndex + 1) % placeholderOptions.length);
    }, 3000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [placeholderOptions.length]); // Incluir placeholderOptions.length en el array de dependencias

  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>{placeholderOptions[currentPlaceholderIndex]}</Form.Label>
        <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} />
      </Form.Group>
      <Button variant="outline-info" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default ReviewForm;

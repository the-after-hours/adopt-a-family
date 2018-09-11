import React from 'react';
import Form from './Form';

const handleSubmit = (event) => {
  event.preventDefault();
};

const Registration = (props) => <Form onSubmit={handleSubmit} />;

export default Registration;

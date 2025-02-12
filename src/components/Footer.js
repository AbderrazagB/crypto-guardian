import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white p-3 mt-5">
      <Container>
        <p className="mb-0 text-center">
          &copy; {new Date().getFullYear()} Crypto Predict. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

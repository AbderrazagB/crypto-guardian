// CryptoNavbar.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const CryptoNavbar = ({ activeSection, setActiveSection }) => {
  return (
    <Navbar expand="lg" className="sticky-top" style={{ backgroundColor: '#1d1f28' }}>
      <Container>
        <Navbar.Brand href="#" style={{ color: '#e0e0e0' }}>CryptoGuardian</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link
            onClick={() => setActiveSection('ethereum')}
            active={activeSection === 'ethereum'}
            style={{
              backgroundColor: activeSection === 'ethereum' ? 'transparent' : '',
              color: activeSection === 'ethereum' ? '#00b0ff' : '#e0e0e0',
            }}
          >
            Ethereum Prediction
          </Nav.Link>
          <Nav.Link
            onClick={() => setActiveSection('tokens')}
            active={activeSection === 'tokens'}
            style={{
              backgroundColor: activeSection === 'tokens' ? 'transparent' : '',
              color: activeSection === 'tokens' ? '#00b0ff' : '#e0e0e0',
            }}
          >
            Token Charts
          </Nav.Link>
          <Nav.Link
            onClick={() => setActiveSection('news')}
            active={activeSection === 'news'}
            style={{
              backgroundColor: activeSection === 'news' ? 'transparent' : '',
              color: activeSection === 'news' ? '#00b0ff' : '#e0e0e0',
            }}
          >
            Crypto News
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CryptoNavbar;

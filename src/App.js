import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CryptoNavbar from './components/CryptoNavbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import EthereumChart from './components/EthereumChart';
import CryptoNews from './components/CryptoNews';
import Sidebar from './components/Sidebar';
import ParticlesBackground from './components/ParticlesBackground';
import './styles/global.css';
import styles from './styles/App.module.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('ethereum');

  return (
    <div className={styles.pageWrapper}>
      <ParticlesBackground />
      <CryptoNavbar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className={styles.mainContent}>
        <Container fluid>
          <Row className="g-4">
            <Col lg={3} md={4} className="d-none d-md-block">
              <Card className={styles.card}>
                <Card.Body>
                  <Sidebar />
                </Card.Body>
              </Card>
            </Col>

            <Col lg={9} md={8} xs={12}>
              <div className={styles.section}>
                {activeSection === 'ethereum' && <EthereumChart />}
                {activeSection === 'news' && <CryptoNews />}
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;

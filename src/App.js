import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CryptoNavbar from './components/CryptoNavbar';  // Import the Navbar here
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EthereumChart = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'ETH Price Prediction',
        data: [2000, 2100, 2200, 2150, 2250, 2300, 2350],
        fill: false,
        backgroundColor: '#007bff',
        borderColor: '#007bff',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Ethereum Price Prediction' },
    },
  };

  return <Line data={data} options={options} />;
};

const TokenCharts = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Token A',
        data: [50, 55, 53, 57, 60, 62, 64],
        fill: false,
        backgroundColor: '#28a745',
        borderColor: '#28a745',
      },
      {
        label: 'Token B',
        data: [30, 35, 33, 37, 40, 42, 44],
        fill: false,
        backgroundColor: '#ffc107',
        borderColor: '#ffc107',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Weekly Price Charts for Other Tokens' },
    },
  };

  return <Line data={data} options={options} />;
};

const CryptoNews = () => {
  const newsItems = [
    { id: 1, title: 'Ethereum hits new high amid market rally' },
    { id: 2, title: 'Bitcoin rally continues as institutional interest grows' },
    { id: 3, title: 'New DeFi protocol promises high yields' },
  ];

  return (
    <div>
      <h3>Crypto News</h3>
      {newsItems.map(item => (
        <Card key={item.id} className="mb-2">
          <Card.Body>{item.title}</Card.Body>
        </Card>
      ))}
    </div>
  );
};

const Sidebar = () => {
  const headlines = [
    'ETH price predicted to surge',
    'New crypto regulations in effect',
    'Market analysis: Tokens on the rise',
    'Breaking: Major crypto hack reported',
  ];

  return (
    <div style={{ padding: '10px' }}>
      <h5>News Headlines</h5>
      <ul className="list-unstyled">
        {headlines.map((headline, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <a href="#" style={{ textDecoration: 'none', color: '#007bff' }}>
              {headline}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState('ethereum');

  return (
    <div>
      <CryptoNavbar activeSection={activeSection} setActiveSection={setActiveSection} />

      <Container fluid className="mt-3">
        <Row>
          {/* Sidebar with Navigation Links on the Left */}
          <Col md={2} className="d-none d-md-block" style={{ borderRight: '1px solid #ddd' }}>
            <Sidebar />
          </Col>

          {/* Main Panel */}
          <Col md={10}>
            <div className="mt-3">
              {activeSection === 'ethereum' && <EthereumChart />}
              {activeSection === 'tokens' && <TokenCharts />}
              {activeSection === 'news' && <CryptoNews />}
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;

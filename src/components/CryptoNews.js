// CryptoNews.js
import React from 'react';
import { Card } from 'react-bootstrap';

const CryptoNews = () => {
  const newsItems = [
    { id: 1, title: 'Ethereum hits new high amid market rally' },
    { id: 2, title: 'Bitcoin rally continues as institutional interest grows' },
    { id: 3, title: 'New DeFi protocol promises high yields' },
  ];

  return (
    <div style={{ backgroundColor: '#1d1f28', padding: '20px', borderRadius: '8px' }}>
      <h3 style={{ color: '#e0e0e0' }}>Crypto News</h3>
      {newsItems.map(item => (
        <Card key={item.id} className="mb-2" style={{ backgroundColor: '#1d1f28', borderColor: '#333' }}>
          <Card.Body style={{ color: '#e0e0e0' }}>{item.title}</Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CryptoNews;

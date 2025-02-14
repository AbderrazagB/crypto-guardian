import React, { useState } from 'react';
import { Card, Collapse, Button } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styles from './styles/CryptoNews.module.css';

const CryptoNews = () => {
  const [openNews, setOpenNews] = useState(null);

  const newsItems = [
    {
      id: 1,
      title: 'Ethereum hits new high amid market rally',
      date: '2025-02-13',
      summary: 'Ethereum has reached a new all-time high as the crypto market experiences a significant rally. The surge comes amid increased institutional adoption and growing interest in DeFi protocols.',
      content: `Ethereum (ETH) has surged to unprecedented heights, marking a significant milestone in the cryptocurrency market. The rally is attributed to several key factors:

• Growing institutional adoption of Ethereum-based products
• Increased activity in DeFi protocols
• Successful implementation of recent network upgrades
• Rising demand for NFTs and Web3 applications

Analysts suggest this could be the beginning of a longer upward trend, with some predicting even higher prices in the coming months.`,
      source: 'CryptoAnalytics Daily',
      tags: ['Ethereum', 'Market Analysis', 'DeFi']
    },
    {
      id: 2,
      title: 'Bitcoin rally continues as institutional interest grows',
      date: '2025-02-13',
      summary: 'Bitcoin maintains its upward trajectory as more institutional investors enter the market. Major financial institutions are increasingly adding Bitcoin to their portfolios.',
      content: `The world's leading cryptocurrency continues its impressive run as institutional adoption reaches new heights. Key developments include:

• Major banks launching crypto custody services
• Corporate treasuries adding Bitcoin to their balance sheets
• Increased integration with traditional financial systems
• Growing acceptance as a legitimate asset class

This institutional backing provides a strong foundation for Bitcoin's long-term growth prospects.`,
      source: 'Crypto Market Insights',
      tags: ['Bitcoin', 'Institutional Investment', 'Market Trends']
    },
    {
      id: 3,
      title: 'New DeFi protocol promises high yields',
      date: '2025-02-13',
      summary: 'A revolutionary DeFi protocol launches with innovative yield optimization strategies. The protocol aims to provide sustainable high yields while maintaining strong security measures.',
      content: `A new decentralized finance protocol has emerged, promising to revolutionize yield farming. The protocol features:

• Advanced yield optimization algorithms
• Multi-layer security architecture
• Cross-chain compatibility
• Automated portfolio rebalancing

However, experts advise careful consideration of risks despite the attractive yields offered.`,
      source: 'DeFi Daily Report',
      tags: ['DeFi', 'Yield Farming', 'Innovation']
    },
  ];

  const toggleNews = (id) => {
    setOpenNews(openNews === id ? null : id);
  };

  return (
    <div className={styles.newsContainer}>
      <h3 className={styles.sectionTitle}>Crypto News</h3>
      {newsItems.map(item => (
        <Card key={item.id} className={styles.newsCard}>
          <Card.Header className={styles.newsHeader}>
            <div className={styles.headerContent}>
              <div className={styles.titleSection}>
                <h5 className={styles.newsTitle}>{item.title}</h5>
                <span className={styles.newsDate}>{item.date}</span>
              </div>
              <Button
                variant="link"
                onClick={() => toggleNews(item.id)}
                className={styles.toggleButton}
                aria-expanded={openNews === item.id}
              >
                {openNews === item.id ? <FaChevronUp /> : <FaChevronDown />}
              </Button>
            </div>
            <div className={styles.newsSummary}>{item.summary}</div>
          </Card.Header>
          
          <Collapse in={openNews === item.id}>
            <div>
              <Card.Body className={styles.newsBody}>
                <div className={styles.newsContent}>
                  {item.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                <div className={styles.newsFooter}>
                  <div className={styles.tagContainer}>
                    {item.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>#{tag}</span>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </div>
          </Collapse>
        </Card>
      ))}
    </div>
  );
};

export default CryptoNews;

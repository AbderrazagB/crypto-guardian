import React from 'react';
import styles from './styles/Sidebar.module.css';

const Sidebar = () => {
  const headlines = [
    'ETH price predicted to surge',
    'New crypto regulations in effect',
    'Market analysis: Tokens on the rise',
    'Breaking: Major crypto hack reported',
  ];

  return (
    <div className={styles.section}>
      <h5 className={styles.cardTitle}>News Headlines</h5>
      <ul className="list-unstyled">
        {headlines.map((headline, index) => (
          <li key={index} className={styles.newsItem}>
            <a href="#" className={styles.newsLink}>
              {headline}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

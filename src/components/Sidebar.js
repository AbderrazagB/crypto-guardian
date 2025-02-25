import React, { useState, useEffect } from 'react';
import styles from './styles/Sidebar.module.css';

const Sidebar = () => {
  const [newsHeadlines, setNewsHeadlines] = useState([]);

  useEffect(() => {
    // Fetch from /news endpoint
    fetch("http://20.199.77.28:5030/news")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.news) {
          const processedNews = data.news.map(item => ({
            id: item.message_id,
            title: item.text.split("\n")[0].replace(/\*\*/g, "").trim(),
            date: new Date(item.timestamp)
          }));
          // Update state with news data
          setNewsHeadlines((prevHeadlines) => {
            const updatedHeadlines = [...prevHeadlines, ...processedNews];
            return updatedHeadlines.sort((a, b) => b.date - a.date).slice(0, 3);
          });
        }
      })
      .catch((error) => console.error("Error fetching news:", error));

    // Fetch from /pd endpoint
    fetch("http://20.199.77.28:5030/pd")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.messages && data.analysis && data.analysis.summary) {
          const processedPdNews = data.messages.map(item => ({
            id: item.message_id,
            title: data.analysis.summary.trim(), // Use summary from analysis
            date: new Date(item.timestamp)
          }));
          // Update state with pd data
          setNewsHeadlines((prevHeadlines) => {
            const updatedHeadlines = [...prevHeadlines, ...processedPdNews];
            return updatedHeadlines.sort((a, b) => b.date - a.date).slice(0, 3);
          });
        }
      })
      .catch((error) => console.error("Error fetching pd data:", error));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.section}>
      <h5 className={styles.cardTitle}>News Headlines</h5>
      <ul className="list-unstyled m-0 p-0">
        {newsHeadlines.length === 0 ? (
          <li className={styles.noNews}>No News</li>
        ) : (
          newsHeadlines.map((news) => (
            <li key={news.id} className={styles.newsItem}>
              <a 
                href="#" 
                className={styles.newsLink}
                onClick={handleClick}
                role="button"
              >
                <span className={styles.newsDate}>
                  {news.date.toLocaleString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
                <p className={styles.newsTitle}>{news.title}</p>
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
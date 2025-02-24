import React, { useState, useEffect } from "react";
import { Card, Collapse, Button } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./styles/CryptoNews.module.css";

const CryptoNews = () => {
  const [openNews, setOpenNews] = useState(null);
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    // Fetch from /news endpoint
    fetch("http://20.199.77.28:5030/news")
      .then((response) => response.json())
      .then((data) => processNewsData(data))
      .catch((error) => console.error("Error fetching news:", error));

    // Fetch from /pd endpoint
    fetch("http://20.199.77.28:5030/pd") // Adjust URL if different
      .then((response) => response.json())
      .then((data) => processPdData(data))
      .catch((error) => console.error("Error fetching pd data:", error));
  }, []);

  const processNewsData = (data) => {
    if (!data || !data.news) return;

    const categorizedNews = data.news.map((item) => {
      const cleanTitle = item.text.split("\n")[0].replace(/\*\*/g, "").trim();
      const summary = item.text.split("\n")[1] || "";

      const dateObj = new Date(item.timestamp);

      let tags = [];
      if (data.analysis.political_sentiment.news_related_to.includes(cleanTitle)) {
        tags.push("Politics");
      }
      if (data.analysis.technical_analysis.news_related_to.includes(cleanTitle)) {
        tags.push("Technical");
      }
      if (data.analysis.new_coins.news_related_to.includes(cleanTitle)) {
        tags.push("New Coins");
      }

      return {
        id: item.message_id,
        title: cleanTitle,
        date: dateObj,
        formattedDate: dateObj.toLocaleString(),
        summary: summary,
        content: item.text.replace(/\*\*/g, ""),
        tags,
      };
    });

    // Merge with existing news items and sort
    setNewsItems((prevItems) => {
      const updatedItems = [...prevItems, ...categorizedNews];
      updatedItems.sort((a, b) => b.date - a.date);
      return updatedItems;
    });
  };

  const processPdData = (data) => {
    if (!data || !data.messages) return;

    const pdNews = data.messages.map((item) => {
      const cleanTitle = item.text.split("\n")[0].trim();
      const dateObj = new Date(item.timestamp || Date.now());

      let tags = [];
      if (data.analysis.is_pump_and_dump) {
        tags.push("Pump & Dump");
      }
      if (data.analysis.cryptocurrencies.length > 0) {
        tags.push(...data.analysis.cryptocurrencies);
      }

      return {
        id: item.message_id,
        title: cleanTitle,
        date: dateObj,
        formattedDate: dateObj.toLocaleString(),
        summary: data.analysis.summary, // Use summary from analysis
        content: `${data.analysis.summary}`, // Combine text and summary
        tags,
      };
    });
    // Merge with existing news items and sort
    setNewsItems((prevItems) => {
      const updatedItems = [...prevItems, ...pdNews];
      updatedItems.sort((a, b) => b.date - a.date);
      return updatedItems;
    });
  };

  const toggleNews = (id) => {
    setOpenNews(openNews === id ? null : id);
  };

  return (
    <div className={styles.newsContainer}>
      <h3 className={styles.sectionTitle}>Crypto News</h3>
      {newsItems.length === 0 ? (
        <p>No news items available.</p>
      ) : (
        newsItems.map((item) => (
          <Card key={item.id} className={styles.newsCard}>
            <Card.Header className={styles.newsHeader}>
              <div className={styles.headerContent}>
                <div className={styles.titleSection}>
                  <h5 className={styles.newsTitle}>{item.title}</h5>
                  <span className={styles.newsDate}>{item.formattedDate}</span>
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
            </Card.Header>
            <Collapse in={openNews === item.id}>
              <div>
                <Card.Body className={styles.newsBody}>
                  <div className={styles.newsContent}>
                    {item.content.split("\n").map((paragraph, index) => (
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
        ))
      )}
    </div>
  );
};

export default CryptoNews;
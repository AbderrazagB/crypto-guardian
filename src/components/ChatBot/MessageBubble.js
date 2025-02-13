import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import styles from '../styles/Chatbot.module.css';
import botLogo from '../../assets/logo.webp';

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`${styles.messageContainer} ${isUser ? styles.userMessage : styles.botMessage}`}>
      {!isUser && (
        <img
          src={botLogo}
          alt="Bot Logo"
          className={styles.botAvatar}
        />
      )}
      <div className={`${styles.messageBubble} ${isUser ? styles.userBubble : styles.botBubble}`}>
        {message.text}
      </div>
      {isUser && <FaUserCircle size={40} className={styles.userAvatar} />}
    </div>
  );
};

export default MessageBubble;

import React, { useState } from 'react';
import { Button, Form, InputGroup, Offcanvas } from 'react-bootstrap';
import axios from 'axios';
import styles from './styles/Chatbot.module.css';
import MessageBubble from './ChatBot/MessageBubble';
import logo from '../assets/logo.svg';
import API_CONFIG from '../config/api.js';

const Chatbot = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleShow = () => setShow(!show);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    setConversation((prev) => [...prev, { sender: 'user', text: message }]);
    const userMessage = message;
    setMessage('');

    try {
      const response = await axios.post(`${API_CONFIG.CHAT_API_URL}${API_CONFIG.ENDPOINTS.CHAT}`, {
        message: userMessage
      });

      // Dummy response structure that you'll receive from your actual endpoint
      // {
      //   success: true,
      //   data: {
      //     reply: string,
      //     context?: any // Additional context if needed
      //   }
      // }

      setConversation((prev) => [...prev, { 
        sender: 'bot', 
        text: response.data.data.reply 
      }]);
    } catch (error) {
      console.error('Error communicating with chatbot:', error);
      setConversation((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, I am unable to respond at the moment. Please try again later.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className={styles.chatButton}
      >
        <img src={logo} alt="Crypto Guardian Bot" className={styles.chatbotLogo} />
      </Button>

      <Offcanvas 
        show={show} 
        onHide={handleShow} 
        placement="end" 
        backdrop={true} 
        scroll={false} 
        className={styles.chatOffcanvas}
      >
        <Offcanvas.Header closeButton className={styles.chatHeader}>
          <Offcanvas.Title>
            <div className={styles.titleContainer}>
              <img src={logo} alt="Crypto Guardian Bot" className={styles.headerLogo} />
              <span>Crypto Guardian</span>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.chatBody}>
          <div className={styles.conversationContainer}>
            {conversation.map((msg, index) => (
              <div key={index} className={styles.messageWrapper}>
                <MessageBubble message={msg} />
              </div>
            ))}
          </div>

          <InputGroup className={styles.inputContainer}>
            <Form.Control
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              disabled={isLoading}
            />
            <Button 
              variant="primary" 
              onClick={sendMessage}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </InputGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Chatbot;

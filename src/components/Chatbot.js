import React, { useState } from 'react';
import { Button, Form, InputGroup, Offcanvas } from 'react-bootstrap';
import axios from 'axios';
import styles from './styles/Chatbot.module.css';
import MessageBubble from './ChatBot/MessageBubble';
import logo from '../assets/logo.svg';

const Chatbot = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleShow = () => setShow(!show);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setConversation((prev) => [...prev, { sender: 'user', text: message }]);
    setMessage('');

    try {
      const response = await axios.post('YOUR_LLM_API_ENDPOINT', { message });
      const botMessage = { sender: 'bot', text: response.data.reply };
      setConversation((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error communicating with LLM:', error);
      setConversation((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, I am unable to respond at the moment.' },
      ]);
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
            />
            <Button variant="primary" onClick={sendMessage}>
              Send
            </Button>
          </InputGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Chatbot;

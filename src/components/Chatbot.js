import React, { useState } from 'react';
import { Button, Form, InputGroup, Offcanvas } from 'react-bootstrap';
import { FaCommentDots, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import botLogo from '../assets/logo.webp';

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
      setConversation((prev) => [...prev, { sender: 'bot', text: response.data.reply }]);
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
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          borderRadius: '50%',
          width: '70px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FaCommentDots size={24} />
      </Button>

      <Offcanvas show={show} onHide={handleShow} placement="end" backdrop={true} scroll={false} style={{ width: '400px' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Neuro Doc</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '10px', padding: '10px' }}>
            {conversation.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '10px',
                }}
              >
                {msg.sender === 'bot' && (
                  <img
                    src={botLogo}
                    alt="Bot Logo"
                    style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                  />
                )}
                <div
                  style={{
                    background: msg.sender === 'user' ? '#007bff' : '#f1f1f1',
                    color: msg.sender === 'user' ? 'white' : 'black',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    maxWidth: '70%',
                  }}
                >
                  {msg.text}
                </div>
                {msg.sender === 'user' && <FaUserCircle size={40} style={{ marginLeft: '10px' }} />}
              </div>
            ))}
          </div>

          <InputGroup style={{ marginTop: 'auto', padding: '10px' }}>
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

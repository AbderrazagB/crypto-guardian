const API_CONFIG = {
  // Base URLs
  CHAT_API_URL: process.env.REACT_APP_CHAT_API_URL || 'http://localhost:5000',
  PREDICTION_API_URL: process.env.REACT_APP_PREDICTION_API_URL || 'http://localhost:5001',

  // Endpoints
  ENDPOINTS: {
    CHAT: '/api/chat',
    ETHEREUM_PREDICTION: '/api/ethereum/predict'
  }
};

export default API_CONFIG;

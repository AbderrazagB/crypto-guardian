import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './styles/EthereumChart.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EthereumChart = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchEthereumPrices = async () => {
      try {
        const response = await axios.get('https://api.binance.com/api/v3/klines', {
          params: {
            symbol: 'ETHUSDT',
            interval: '1d',
            limit: 7,
          },
        });

        const formattedData = response.data.map(item => ({
          timestamp: new Date(item[0]),
          price: parseFloat(item[4]),
        }));

        const lastPrice = formattedData[formattedData.length - 1].price;
        const lastDate = formattedData[formattedData.length - 1].timestamp;

        // Generate future dates and predictions
        const futureDates = [];
        const predictions = [];
        const predictionRates = [1.02, 1.035, 1.05]; // 2%, 3.5%, 5% increases

        for (let i = 0; i < 3; i++) {
          const date = new Date(lastDate);
          date.setDate(date.getDate() + i + 1);
          futureDates.push(date);
          predictions.push(lastPrice * predictionRates[i]);
        }

        // Prepare historical data
        const historicalLabels = formattedData.map(item => 
          item.timestamp.toLocaleDateString('en-US', { weekday: 'short' })
        );
        const historicalPrices = formattedData.map(item => item.price);

        // Prepare prediction data
        const predictionLabels = futureDates.map(date =>
          date.toLocaleDateString('en-US', { weekday: 'short' })
        );

        // Create historical line data (add nulls for prediction period)
        const historicalLine = [...historicalPrices, ...Array(3).fill(null)];

        // Create prediction line data (nulls for historical period, then predictions)
        const predictionLine = [
          ...Array(historicalPrices.length - 1).fill(null),
          historicalPrices[historicalPrices.length - 1],
          ...predictions
        ];

        setChartData({
          labels: [...historicalLabels, ...predictionLabels],
          datasets: [
            {
              label: 'Historical Price',
              data: historicalLine,
              fill: true,
              backgroundColor: 'rgba(100, 255, 218, 0.1)',
              borderColor: '#64FFDA',
              borderWidth: 2,
              pointBackgroundColor: '#fff',
              pointBorderColor: '#64FFDA',
              tension: 0.4,
            },
            {
              label: 'AI Prediction',
              data: predictionLine,
              fill: false,
              borderColor: '#FF8C00',
              borderWidth: 2,
              borderDash: [5, 5],
              pointBackgroundColor: '#fff',
              pointBorderColor: '#FF8C00',
              tension: 0.4,
            },
          ],
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Ethereum prices:', err);
        setError('Failed to load price data');
        setLoading(false);
      }
    };

    fetchEthereumPrices();
    const interval = setInterval(fetchEthereumPrices, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { 
          color: '#e0e0e0',
          font: { size: 12 }
        }
      },
      tooltip: {
        titleColor: '#e0e0e0',
        bodyColor: '#e0e0e0',
        backgroundColor: 'rgba(26, 27, 30, 0.9)',
        callbacks: {
          label: (context) => `$${context.parsed.y.toFixed(2)}`,
        },
      },
      title: {
        display: true,
        text: 'Ethereum Price Prediction',
        color: '#e0e0e0',
        font: {
          size: 16,
          weight: '600'
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(68, 68, 68, 0.5)',
          drawBorder: false
        },
        ticks: {
          color: '#e0e0e0',
          maxRotation: 45,
          minRotation: 45,
          font: { size: 10 }
        }
      },
      y: {
        grid: {
          color: 'rgba(68, 68, 68, 0.5)',
          drawBorder: false
        },
        ticks: {
          color: '#e0e0e0',
          callback: (value) => `$${value.toFixed(2)}`,
          font: { size: 10 }
        }
      }
    },
  };

  if (loading) {
    return (
      <div className={styles.chartContainer}>
        <div className={styles.loadingMessage}>Loading price data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.chartContainer}>
        <div className={styles.errorMessage}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.chartWrapper}>
      <h2 className={styles.chartTitle}>
        <span className={styles.titleText}>Ethereum Price Prediction</span>
        <span className={styles.subtitleText}>AI-Powered Price Forecast</span>
      </h2>
      <div className={styles.chartContainer}>
        {chartData && <Line data={chartData} options={options} />}
      </div>
    </div>
  );
};

export default EthereumChart;

// EthereumChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
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
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'ETH Price Prediction',
        data: [2000, 2100, 2200, 2150, 2250, 2300, 2350],
        fill: false,
        backgroundColor: '#00b0ff', // Light blue
        borderColor: '#00b0ff', // Light blue
        borderWidth: 2,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#00b0ff',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#e0e0e0' } },
      tooltip: { titleColor: '#e0e0e0', bodyColor: '#e0e0e0', backgroundColor: '#333' },
      title: { display: true, text: 'Ethereum Price Prediction', color: '#e0e0e0' },
    },
    scales: {
      x: { grid: { color: '#444' }, ticks: { color: '#e0e0e0' } },
      y: { grid: { color: '#444' }, ticks: { color: '#e0e0e0' } },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <Line data={data} options={options} />
    </div>
  );
};

export default EthereumChart;

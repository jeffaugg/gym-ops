import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
  LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import api from "../../../../api";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ChartComponent = ({ title, endpoint, label}) => {
  
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: label,
        data: [],
        borderColor: "#76709d",
        backgroundColor: "#76709d",
        fill: 'start',
        tension: 0.2,
      },
    ],
  });

  const fetchData = async () => {
    try {
      const response = await api.get(endpoint);
      const data = response.data;

      const labels = data.map((item) => item.payment_day);  
      const dataset = data.map((item) => item.total_price);  

      setChartData({
        labels,
        datasets: [
          {
            label,
            data: dataset,
            borderColor: "#76709d",
            backgroundColor: "#76709d",
            fill: 'start'
          }
        ],
      });

    } catch (error) {
      console.error(`Erro ao buscar dados do endpoint ${endpoint}`, error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    responsive: true,
    pointBackgroundColor: '#fff',
    radius: 6,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 20,
          weight: 'bold',
        },
        align: 'start',
      },
      legend: {
        position: 'top',
        labels: {
          font: { size: 14 },
        },
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 12 } },
      },
      y: {
        ticks: {
          font: { size: 12 },
          callback: function (value) {
            return 'R$ ' + value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

// Validação das props usando PropTypes
ChartComponent.propTypes = {
  title: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default ChartComponent;
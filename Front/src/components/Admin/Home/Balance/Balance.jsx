import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler} from 'chart.js';
import api from "../../../../api";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Balance = () => {

    
  const [paymentsData, setPaymentsData] = useState({
    labels: [], 
    datasets: [
      {
        label: 'Pagamentos',
        data: [], 
        tension: 0.2, 
      },
    ],
  });

  const fetchPaymentsData = async () => {
    try {
      const response = await api.get(`/report/balance`); 
      const data = response.data;
      const labels = data.map(payment => payment.payment_date);
      const dataset = data.map(payment => payment.plano.price);
      setPaymentsData({
        labels,
        datasets: [
          {
            label: 'Pagamentos',
            data: dataset,
            borderColor: '#76709d',
            backgroundColor: '#76709d',
            fill: 'start'
          }
        ],
      });

    } catch (error) {
      console.error('Erro ao buscar dados dos pagamentos', error);
    }
  };
  useEffect(() => {
    fetchPaymentsData();
  }, []);

  const options = {
    responsive: true,
    pointBackgroundColor: '#fff',
    radius: 6,
    plugins: {
      title: {
        display: true,
        text: 'Balanço de Pagamentos',
        font: {
          size: 20,
          weight: 'bold', 
        },
        align: 'start', 
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14, 
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12, 
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
          callback: function (value) {
            return 'R$ ' + value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div>
      <Line data={paymentsData} options={options} />
    </div>
  );
};

export default Balance;
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler} from 'chart.js';
import api from "../../../../api";

// Registre os componentes necessários do Chart.js
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
      const response = await api.get(`/report/balance`); // Assumindo que você tem uma rota para pegar os pagamentos
      const data = response.data;
      const labels = data.map(payment => payment.payment_date); // Convertendo data para labels
      const dataset = data.map(payment => payment.plano.price); // Pegando os valores dos pagamentos
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

  // Configurações para o gráfico
  const options = {
    responsive: true,
    pointBackgroundColor: '#fff',
    radius: 6,
    plugins: {
      title: {
        display: true,
        text: 'Balanço de Pagamentos',
        font: {
          size: 20, // Tamanho da fonte do título
          weight: 'bold', // Peso da fonte
        },
        align: 'start', // Alinha o título à esquerda
      },
      legend: {
        position: 'top', // Posicionamento da legenda
        labels: {
          font: {
            size: 14, // Tamanho da fonte da legenda
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12, // Tamanho da fonte no eixo X
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 12, // Tamanho da fonte no eixo Y
          },
          callback: function (value) {
            // Formata os valores com R$ e separador de milhar
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
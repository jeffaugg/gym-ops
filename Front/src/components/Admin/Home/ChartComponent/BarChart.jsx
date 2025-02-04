import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from 'chart.js';
import api from "../../../../api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({endpoint, label }) => {
  
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: label,
        data: [],
        backgroundColor: "#76709d",
        borderColor: "#76709d",
        borderWidth: 1,
      },
    ],
  });

  // Função para calcular a data da semana atual no formato dd/mm - dd/mm
  const getCurrentWeekRange = () => {
    const currentDate = new Date();
    const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)); // Segunda-feira
    const lastDayOfWeek = new Date(currentDate.setDate(firstDayOfWeek.getDate() + 6)); // Domingo

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
      return `${day}/${month}`;
    };

    return `${formatDate(firstDayOfWeek)} - ${formatDate(lastDayOfWeek)}`;
  };

  const fetchData = async () => {
    try {
      const response = await api.get(endpoint);
      const data = response.data;
      const today = new Date();
      const todayWeekDay = today.getDay();
      const daysOfWeek = ["S", "T", "Q", "Q", "S", "S", "D"];
      daysOfWeek[todayWeekDay] = "Hoje";
      const presenceCount = new Array(7).fill(0); // Inicializa um array com 0 para contar as presenças

      // Contabiliza as presenças por dia da semana
      data.forEach(item => {
        const date = new Date(item.data);
        const dayOfWeek = date.getDay(); // Domingo = 0, Segunda-feira = 1, ..., Sábado = 6
        presenceCount[dayOfWeek]++;
      });

      // Calculando a quantidade total de presenças na semana
      const totalPresences = presenceCount.reduce((acc, curr) => acc + curr, 0);

      setChartData({
        labels: daysOfWeek,
        datasets: [
          {
            label: `Semana ${getCurrentWeekRange()}`,
            data: presenceCount,
            backgroundColor: "#76709d",
            borderColor: "#76709d",
            borderWidth: 1,
          }
        ],
      });

      // Atualizando o título com a quantidade total de presenças
      setTitle(`${totalPresences} Pessoas`);
    } catch (error) {
      console.error(`Erro ao buscar dados do endpoint ${endpoint}`, error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Variável de título e subtítulo
  const [title, setTitle] = useState('');
  
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title, // Exibe o total de presenças na semana
        font: {
          size: 20,
          weight: 'bold',
        },
        align: 'start',
      },
      subtitle: {
        display: true,
        text: `Semana ${getCurrentWeekRange()}`, // Exibe o intervalo da semana como subtítulo
        font: {
          size: 16,
          weight: 'normal',
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
        grid: { display: false },
      },
      y: {
        ticks: {
          display:false
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

BarChart.propTypes = {
  title: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default BarChart;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import api from "../../../../api";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ChartComponent = ({ title, endpoint, label }) => {
  // Estado para armazenar a data selecionada
  const [startDate, setStartDate] = useState(getDefaultStartDate());
  const [endDate, setEndDate] = useState(getDefaultEndDate());
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: label,
        data: [],
        borderColor: "#76709d",
        backgroundColor: "#76709d",
        fill: "start",
        tension: 0.2,
      },
    ],
  });

  // Função para obter a data padrão (30 dias atrás)
  function getDefaultStartDate() {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split("T")[0]; // Retorna no formato YYYY-MM-DD
  }

  // Função para obter a data padrão (hoje)
  function getDefaultEndDate() {
    return new Date().toISOString().split("T")[0]; // Retorna no formato YYYY-MM-DD
  }

  // Função para buscar dados da API com os filtros selecionados
  const fetchData = async () => {
    try {
      const response = await api.get(endpoint, {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      });

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
            fill: "start",
          },
        ],
      });
    } catch (error) {
      console.error(`Erro ao buscar dados do endpoint ${endpoint}`, error);
    }
  };

  // Atualiza os dados sempre que `startDate` ou `endDate` mudar
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]); // Dependências do useEffect

  const options = {
    responsive: true,
    pointBackgroundColor: "#fff",
    radius: 6,
    plugins: {
      title: {
        display: true,
        text: title,
        font: { size: 20, weight: "bold" },
        align: "start",
      },
      legend: {
        position: "top",
        labels: { font: { size: 14 } },
      },
    },
    scales: {
      x: { ticks: { font: { size: 12 } } },
      y: {
        beginAtZero: true,
        ticks: {
          font: { size: 12 },
          callback: function (value) {
            return "R$ " + value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div>
      {/* 🔹 Inputs para selecionar o intervalo de datas */}
      <label>Data de Início:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
      <br />
      <label>Data de Fim:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      {/* 🔹 Gráfico */}
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

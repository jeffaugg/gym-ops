import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../../../../api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ endpoint, label }) => {
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

  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());
  const [title, setTitle] = useState("");

  // 🔹 Obtém a semana atual no formato YYYY-W## (exemplo: 2024-W07)
  function getCurrentWeek() {
    const today = new Date();
    const year = today.getFullYear();
    const week = getWeekNumber(today);
    return `${year}-W${week}`;
  }

  // 🔹 Converte um objeto Date para o número da semana do ano
  function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDays = (date - firstDayOfYear) / 86400000;
    return String(Math.ceil((pastDays + firstDayOfYear.getDay() + 1) / 7)).padStart(2, "0");
  }

  // 🔹 Calcula `start_date` (domingo) e `end_date` (sábado) a partir de uma semana
  function getStartAndEndDate(weekString) {
    const [year, week] = weekString.split("-W").map(Number);
    const firstDayOfYear = new Date(year, 0, 1);
    const daysOffset = (week - 1) * 7; // Cada semana tem 7 dias
    const sunday = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + daysOffset - firstDayOfYear.getDay())); // Domingo
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6); // Sábado

    return {
      start_date: sunday.toISOString().split("T")[0], // YYYY-MM-DD
      end_date: saturday.toISOString().split("T")[0], // YYYY-MM-DD
    };
  }

  const fetchData = async () => {
    try {
      const { start_date, end_date } = getStartAndEndDate(selectedWeek);

      const response = await api.get(endpoint, {
        params: { start_date, end_date },
      });

      const data = response.data;
      const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];
      const presenceCount = new Array(7).fill(0);

      data.forEach((item) => {
        const date = new Date(item.dia);
        const dayOfWeek = date.getDay(); // 0 = Domingo, ..., 6 = Sábado
        presenceCount[dayOfWeek] = item.total_presencas;
      });

      // Calcula o total de presenças na semana
      const totalPresences = presenceCount.reduce((acc, curr) => Number(acc) + Number(curr), 0);

      setChartData({
        labels: daysOfWeek,
        datasets: [
          {
            label: `Semana ${selectedWeek}`,
            data: presenceCount,
            backgroundColor: "#76709d",
            borderColor: "#76709d",
            borderWidth: 1,
          },
        ],
      });

      setTitle(`${totalPresences} Pessoas`);
    } catch (error) {
      console.error(`Erro ao buscar dados do endpoint ${endpoint}`, error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedWeek]); // 🔹 Atualiza os dados sempre que a semana for alterada

  const options = {
    responsive: true,
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
      x: { ticks: { font: { size: 12 } }, grid: { display: false } },
      y: { ticks: { display: false }, grid: { display: false } },
    },
  };

  return (
    <div>
      <label htmlFor="week-picker">Selecione uma semana:</label>
      <input
        type="week"
        id="week-picker"
        value={selectedWeek}
        onChange={(e) => setSelectedWeek(e.target.value)}
      />
      <Bar data={chartData} options={options} />
    </div>
  );
};

BarChart.propTypes = {
  endpoint: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default BarChart;

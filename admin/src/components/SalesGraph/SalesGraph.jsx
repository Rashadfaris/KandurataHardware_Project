import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'; // Import Filler
import './SalesGraph.css'; // Import the CSS file

// Register required components, including the Filler plugin
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const SalesGraph = () => {
  const [dailySales, setDailySales] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/invoice');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const invoices = await response.json();
        const salesData = processInvoices(invoices);
        setDailySales(salesData.sales);
        setLabels(salesData.labels);
      } catch (error) {
        console.error('Error fetching invoices:', error.message); // Improved error logging
      }
    };

    fetchInvoices();
  }, []);

  const processInvoices = (invoices) => {
    const salesByDate = {};

    invoices.forEach(invoice => {
      const date = new Date(invoice.createdAt).toLocaleDateString();
      if (!salesByDate[date]) {
        salesByDate[date] = 0;
      }
      salesByDate[date] += invoice.totalAmount;
    });

    const labels = Object.keys(salesByDate);
    const sales = Object.values(salesByDate);

    return { labels, sales };
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Daily Sales',
        data: dailySales,
        borderColor: 'tomato',
        backgroundColor: 'rgba(255, 99, 71, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Sales Graph',
      },
    },
  };

  return (
    <div className="sales-graph-container">   
        <Line data={data} options={options} />
      <div className="legend-container">
      </div>
    </div>
  );
};

export default SalesGraph;

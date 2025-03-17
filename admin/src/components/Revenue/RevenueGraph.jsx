import React from 'react';
import { Line } from 'react-chartjs-2'; // Ensure you have react-chartjs-2 installed

const RevenueGraph = () => {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Revenue',
        data: [1200, 1900, 3000, 2500],
        fill: false,
        backgroundColor: 'tomato',
        borderColor: 'tomato',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="revenue-graph">
      <h3>Revenue Over Time</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueGraph;

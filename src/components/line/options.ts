import { ChartOptions } from "chart.js";

export const options: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: '£ earned each month',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
  };
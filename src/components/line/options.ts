import { ChartOptions } from 'chart.js';

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
                color: '#ffffff',
                font: {
                    family: 'Cinzel',
                    size: 16,
                    weight: 400,
                },
                padding: {
                    top: 5,
                },
            },
            ticks: {
                color: '#ffffff',
                font: {
                    family: 'Barlow',
                    size: 12,
                },
            },
        },
        y: {
            grid: {
                display: false,
            },
            title: {
                display: true,
                text: '£ earned each month',
                color: '#ffffff',
                font: {
                    family: 'Cinzel',
                    size: 16,
                    weight: 400,
                },
            },
            ticks: {
                color: '#ffffff',
                font: {
                    family: 'Barlow',
                    size: 12,
                },
            },
        },
    },
    plugins: {
        legend: {
            display: true,
            labels: {
                color: '#ffffff',
                font: {
                    family: 'Barlow',
                    size: 14,
                },
            },
        },
        tooltip: {
            backgroundColor: '#160d35',
            titleFont: {
                family: 'Cinzel',
                size: 14,
                weight: 400,
            },
            bodyFont: {
                family: 'Barlow',
                size: 12,
            },
            callbacks: {
                label: (context) => {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('en-GB', {
                            style: 'currency',
                            currency: 'GBP',
                        }).format(context.parsed.y);
                    }
                    return label;
                },
            },
        },
    },
    elements: {
        point: {
            radius: 5,
            backgroundColor: '#ff6384',
            borderColor: '#fff',
            borderWidth: 2,
            hoverRadius: 7,
            hoverBackgroundColor: '#ff6384',
            hoverBorderColor: '#fff',
            hoverBorderWidth: 3,
        },
    },
};

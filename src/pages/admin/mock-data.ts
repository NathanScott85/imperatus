const magic = [
    { month: 'Jan', total: 28 },
    { month: 'Feb', total: 23 },
    { month: 'Mar', total: 87 },
    { month: 'Apr', total: 42 },
    { month: 'May', total: 11 },
    { month: 'Jun', total: 69 },
    { month: 'Jul', total: 34 },
    { month: 'Aug', total: 78 },
    { month: 'Sep', total: 5 },
    { month: 'Oct', total: 91 },
    { month: 'Nov', total: 19 },
    { month: 'Dec', total: 73 },
];

const pokemon = [
    { month: 'Jan', total: 3 },
    { month: 'Feb', total: 7 },
    { month: 'Mar', total: 49 },
    { month: 'Apr', total: 61 },
    { month: 'May', total: 29 },
    { month: 'Jun', total: 34 },
    { month: 'Jul', total: 12 },
    { month: 'Aug', total: 52 },
    { month: 'Sep', total: 44 },
    { month: 'Oct', total: 85 },
    { month: 'Nov', total: 6 },
    { month: 'Dec', total: 37 },
];
const yugioh = [
    { month: 'Jan', total: 3 },
    { month: 'Feb', total: 24 },
    { month: 'Mar', total: 69 },
    { month: 'Apr', total: 53 },
    { month: 'May', total: 29 },
    { month: 'Jun', total: 9 },
    { month: 'Jul', total: 12 },
    { month: 'Aug', total: 52 },
    { month: 'Sep', total: 17 },
    { month: 'Oct', total: 56 },
    { month: 'Nov', total: 6 },
    { month: 'Dec', total: 37 },
];

export const salesData = {
    labels: yugioh.map((order) => order.month),
    datasets: [
        {
            label: 'Yugioh',
            data: yugioh.map((order) => order.total),
            fill: false,
            borderColor: '1px solid rgb(77, 60, 123)',
            backgroundColor: 'rgba(75,192,192,0.2)',
        },
        {
            label: 'Magic the Gathering',
            data: magic.map((order) => order.total),
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
        },
        {
            label: 'Pokemon',
            data: pokemon.map((order) => order.total),
            fill: false,
            borderColor: 'orange',
        },
    ],
};

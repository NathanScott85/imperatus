export const orders = [
    { month: 'Jan', value: 33 },
    { month: 'Feb', value: 53 },
    { month: 'Mar', value: 67 },
    { month: 'Apr', value: 41 },
    { month: 'May', value: 44 },
    { month: 'Jun', value: 65 },
    { month: 'Jul', value: 49 },
    { month: 'Aug', value: 88 },
    { month: 'Sep', value: 77 },
    { month: 'Oct', value: 55 },
    { month: 'Nov', value: 66 },
    { month: 'Dec', value: 44 },
];

const magic = [
    { month: 'Jan', value: 28 },
    { month: 'Feb', value: 23 },
    { month: 'Mar', value: 87 },
    { month: 'Apr', value: 42 },
    { month: 'May', value: 11 },
    { month: 'Jun', value: 69 },
    { month: 'Jul', value: 34 },
    { month: 'Aug', value: 78 },
    { month: 'Sep', value: 5 },
    { month: 'Oct', value: 91 },
    { month: 'Nov', value: 19 },
    { month: 'Dec', value: 73 },
];

const pokemon = [
    { month: 'Jan', value: 3 },
    { month: 'Feb', value: 7 },
    { month: 'Mar', value: 49 },
    { month: 'Apr', value: 61 },
    { month: 'May', value: 29 },
    { month: 'Jun', value: 34 },
    { month: 'Jul', value: 12 },
    { month: 'Aug', value: 52 },
    { month: 'Sep', value: 44 },
    { month: 'Oct', value: 85 },
    { month: 'Nov', value: 6 },
    { month: 'Dec', value: 37 },
];
const yugioh = [
    { month: 'Jan', value: 3 },
    { month: 'Feb', value: 24 },
    { month: 'Mar', value: 69 },
    { month: 'Apr', value: 53 },
    { month: 'May', value: 29 },
    { month: 'Jun', value: 9 },
    { month: 'Jul', value: 12 },
    { month: 'Aug', value: 52 },
    { month: 'Sep', value: 17 },
    { month: 'Oct', value: 56 },
    { month: 'Nov', value: 6 },
    { month: 'Dec', value: 37 },
];

export const salesData = {
    labels: yugioh.map((order) => order.month),
    datasets: [
        {
            label: 'Yugioh',
            data: yugioh.map((order) => order.value),
            fill: false,
            borderColor: '1px solid rgb(77, 60, 123)',
            backgroundColor: 'rgba(75,192,192,0.2)',
        },
        {
            label: 'Magic the Gathering',
            data: magic.map((order) => order.value),
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
        },
        {
            label: 'Pokemon',
            data: pokemon.map((order) => order.value),
            fill: false,
            borderColor: 'orange',
        },
    ],
};

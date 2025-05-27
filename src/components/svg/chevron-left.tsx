import React from 'react';

export const ChevronLeft: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        {...props}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M15 18L9 12L15 6"
            stroke="#ac8fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const ChevronDoubleLeft: React.FC<React.SVGProps<SVGSVGElement>> = (
    props,
) => (
    <svg
        {...props}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M15 18L9 12L15 6"
            stroke="#ac8fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M11 18L5 12L11 6"
            stroke="#ac8fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

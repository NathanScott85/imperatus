import React from 'react';

export const ChevronRight: React.FC<React.SVGProps<SVGSVGElement>> = (
    props,
    stroke = '#ac8fff',
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
            d="M9 18L15 12L9 6"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

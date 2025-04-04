import React from 'react';

interface IIcon {
    isAuthenticated?: boolean;
}
export const Icon = ({ isAuthenticated }: IIcon) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            // fill="#none"
            fill={isAuthenticated ? '#C79D0A' : 'none'}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15.75 6C15.75 8.07107 14.0711 9.75 12 9.75C9.92896 9.75 8.25002 8.07107 
                8.25002 6C8.25002 3.92893 9.92896 2.25 12 2.25C14.0711 2.25 15.75 3.92893 15.75 6Z"
                stroke="#C79D0A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.50116 20.1182C4.57146 16.0369 7.9019 12.75 12 12.75C16.0983 12.75 19.4287 
                16.0371 19.4989 20.1185C17.2161 21.166 14.6764 21.75 12.0003 21.75C9.32402 21.75 6.78412 
                21.1659 4.50116 20.1182Z"
                stroke="#C79D0A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

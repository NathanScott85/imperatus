import React from 'react';

export const Icon = ({ show = false }: { show?: boolean }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2.0355 12.3248C1.96642 12.1176 1.96635 11.8932 2.03531 11.6859C3.42368 7.51216 7.36074 4.50244 12.0008 4.50244C16.6386 4.50244 20.5742 7.50937 21.9643 11.68C22.0334 11.8873 22.0334 12.1117 21.9645 12.319C20.5761 16.4927 16.639 19.5024 11.999 19.5024C7.36115 19.5024 3.42559 16.4955 2.0355 12.3248Z"
                stroke= {show ? 'white' : '#C79D0A'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill='none'
            />
            <path
                d="M15 12.0024C15 13.6593 13.6568 15.0024 12 15.0024C10.3431 15.0024 8.99995 13.6593 8.99995 12.0024C8.99995 10.3456 10.3431 9.00244 12 9.00244C13.6568 9.00244 15 10.3456 15 12.0024Z"
                stroke= {show ? 'white' : '#C79D0A'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </svg>
    );
};

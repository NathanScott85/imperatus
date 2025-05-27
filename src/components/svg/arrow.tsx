import React from 'react';

export interface IconProps {
    width?: string;
    height?: string;
    color?: string;
    viewbox?: string;
    fill?: string;
    type: string;
}

export const ArrowDown = ({ type, fill }: IconProps) => (
    <>
        {type.includes('small') && (
            <svg
                data-testid="arrow-down-small"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 3C10.4142 3 10.75 3.33579 10.75 3.75L10.75 14.3879L14.7094 10.2302C14.9965 9.93159 15.4713 9.92228 15.7698 10.2094C16.0684 10.4965 16.0777 10.9713 15.7906 11.2698L10.5406 16.7698C10.3992 16.9169 10.204 17 10 17C9.79599 17 9.60078 16.9169 9.45938 16.7698L4.20938 11.2698C3.92228 10.9713 3.93159 10.4965 4.23017 10.2094C4.52875 9.92228 5.00353 9.93159 5.29063 10.2302L9.25 14.3879L9.25 3.75C9.25 3.33579 9.58579 3 10 3Z"
                    fill={fill}
                />
            </svg>
        )}
        {type.includes('medium') && (
            <svg
                data-testid="arrow-down-medium"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M19.5 13.5L12 21M12 21L4.5 13.5M12 21L12 3"
                    stroke="#0F172A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        )}
        {type.includes('large') && (
            <svg
                data-testid="arrow-down-large"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2.25C12.4142 2.25 12.75 2.58579 12.75 3L12.75 19.1893L18.9697 12.9697C19.2626 12.6768 19.7374 12.6768 20.0303 12.9697C20.3232 13.2626 20.3232 13.7374 20.0303 14.0303L12.5303 21.5303C12.2374 21.8232 11.7626 21.8232 11.4697 21.5303L3.96967 14.0303C3.67678 13.7374 3.67678 13.2626 3.96967 12.9697C4.26256 12.6768 4.73744 12.6768 5.03033 12.9697L11.25 19.1893L11.25 3C11.25 2.58579 11.5858 2.25 12 2.25Z"
                    fill="#0F172A"
                />
            </svg>
        )}
    </>
);

export const ArrowUp = ({ type, fill }: IconProps) => (
    <>
        {type.includes('small') && (
            <svg
                data-testid="arrow-up-small"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 17C9.58579 17 9.25 16.6642 9.25 16.25L9.25 5.61208L5.29062 9.76983C5.00353 10.0684 4.52875 10.0777 4.23017 9.79063C3.93159 9.50353 3.92228 9.02875 4.20937 8.73017L9.45937 3.23017C9.60078 3.08311 9.79598 3 10 3C10.204 3 10.3992 3.08311 10.5406 3.23017L15.7906 8.73017C16.0777 9.02875 16.0684 9.50353 15.7698 9.79062C15.4713 10.0777 14.9965 10.0684 14.7094 9.76983L10.75 5.61208L10.75 16.25C10.75 16.6642 10.4142 17 10 17Z"
                    fill={fill}
                />
            </svg>
        )}
        {type.includes('medium') && (
            <svg
                data-testid="arrow-up-medium"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M4.5 10.5L12 3M12 3L19.5 10.5M12 3V21"
                    stroke="#0F172A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        )}
        {type.includes('large') && (
            <svg
                data-testid="arrow-up-large"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.4697 2.46967C11.7626 2.17678 12.2374 2.17678 12.5303 2.46967L20.0303 9.96967C20.3232 10.2626 20.3232 10.7374 20.0303 11.0303C19.7374 11.3232 19.2626 11.3232 18.9697 11.0303L12.75 4.81066V21C12.75 21.4142 12.4142 21.75 12 21.75C11.5858 21.75 11.25 21.4142 11.25 21V4.81066L5.03033 11.0303C4.73744 11.3232 4.26256 11.3232 3.96967 11.0303C3.67678 10.7374 3.67678 10.2626 3.96967 9.96967L11.4697 2.46967Z"
                    fill="#0F172A"
                />
            </svg>
        )}
    </>
);

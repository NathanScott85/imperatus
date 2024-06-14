import React from "react";

export const FiltersDiamond = () => {
    return (
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4D3C7B" stopOpacity="1" />
                    <stop offset="100%" stopColor="#D4B05F" stopOpacity="1" />
                </linearGradient>
            </defs>
            <rect 
                x="50" 
                y="50" 
                width="100" 
                height="100" 
                transform="rotate(45 100 100)" 
                fill="none" 
                stroke="url(#gradient)" 
                strokeWidth="2" 
            />
            <line 
                x1="50" 
                y1="100" 
                x2="10" 
                y2="100" 
                stroke="url(#gradient)" 
                strokeWidth="2" 
            />
            <line 
                x1="150" 
                y1="100" 
                x2="190" 
                y2="100" 
                stroke="url(#gradient)" 
                strokeWidth="2" 
            />
            <line 
                x1="100" 
                y1="50" 
                x2="100" 
                y2="10" 
                stroke="url(#gradient)" 
                strokeWidth="2" 
            />
            <line 
                x1="100" 
                y1="150" 
                x2="100" 
                y2="190" 
                stroke="url(#gradient)" 
                strokeWidth="2" 
            />
        </svg>
    );
};

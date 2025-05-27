import React from 'react';
import { IconProps } from './interface';

export const ChevronUp = ({
    width = '24',
    height = '24',
    viewbox = '0 0 24 24',
    fill = 'none',
    stroke = '#C79D0A',
}: IconProps) => (
    <svg width={width} height={height} viewBox={viewbox} fill={fill}>
        <path
            d="M18 15L12 9L6 15"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

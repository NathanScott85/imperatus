import { IconProps } from './interface';

export const ChevronUp = ({
    width,
    height,
    color,
    viewbox,
    fill,
    type,
    stroke = '#C79D0A',
}: IconProps) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
            d="M18 15L12 9L6 15"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

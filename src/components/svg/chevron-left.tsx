export const ChevronLeft: React.FC<React.SVGProps<SVGSVGElement>> = ({
    onClick,
}: any) => (
    <svg
        onClick={onClick}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
    >
        <path
            d="M15 18L9 12L15 6"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

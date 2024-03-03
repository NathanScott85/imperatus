export interface IconProps {
    width?: string;
    height?: string;
    color?: string;
    viewbox?: string;
    fill?: string;
    type: string;
}
export const Icon = ({ width = '28', height = '28', viewbox ="0 0 20 16", fill = 'none', type }: IconProps) => (
    <>
    {
        type.includes('bag') && <svg width="18" height="20" viewBox="0 0 18 20" fill={fill}>
        <rect x="1" y="6" width="16" height="13" rx="4" stroke="#2B3F6C" strokeWidth="1.5"/>
        <path d="M13 8V5C13 2.79086 11.2091 1 9 1V1C6.79086 1 5 2.79086 5 5L5 8" stroke="#2B3F6C" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    }
    {
        type?.includes('full') && <svg width="20" height="22" viewBox="0 0 20 22" fill={fill}>
        <path d="M2.53715 9.47134C2.80212 7.48412 4.49726 6 6.50207 6H13.4979C15.5027 6 17.1979 7.48412 17.4628 9.47135L18.3962 
            16.4713C18.7159 18.8693 16.8504 21 14.4313 21H5.56873C3.14958 21 1.2841 18.8693 1.60382 
            16.4713L2.53715 9.47134Z" stroke="#C79D0A" strokeWidth="1.5"/>
        <path d="M7.5 14L9.5 16L13.5 12" stroke="#C79D0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 8V5C14 2.79086 12.2091 1 10 1V1C7.79086 1 6 2.79086 6 5L6 8" stroke="#C79D0A" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    }
    {
        type?.includes('Bag') && <svg width="20" height="22" viewBox="0 0 20 22" fill={fill}>
        <path d="M13.75 9.5V5C13.75 2.92893 12.0711 1.25 10 1.25C7.92893 1.25 6.25 2.92893 6.25 5V9.5M17.606 7.50723L18.8692 
            19.5072C18.9391 20.1715 18.4183 20.75 17.7504 20.75H2.24963C1.58172 20.75 1.06089 20.1715 1.13081 
            19.5072L2.39397 7.50723C2.45424 6.93466 2.93706 6.5 3.51279 6.5H16.4872C17.0629 6.5 17.5458 6.93466 
            17.606 7.50723ZM6.625 9.5C6.625 9.70711 6.4571 9.875 6.25 9.875C6.04289 9.875 5.875 9.70711 5.875 
            9.5C5.875 9.29289 6.04289 9.125 6.25 9.125C6.4571 9.125 6.625 9.29289 6.625 9.5ZM14.125 9.5C14.125 
            9.70711 13.9571 9.875 13.75 9.875C13.5429 9.875 13.375 9.70711 13.375 9.5C13.375 9.29289 13.5429 
            9.125 13.75 9.125C13.9571 9.125 14.125 9.29289 14.125 9.5Z"
             stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
        </svg>
    }
    </>
);
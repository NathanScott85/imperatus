import React, { useState } from 'react';
import styled from 'styled-components';

interface TooltipProps {
    message: string | React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ message }) => {
    const [show, setShow] = useState(false);

    return (
        <TooltipWrapper>
            <TooltipIcon onClick={() => setShow(!show)}>?</TooltipIcon>
            {show && <ToolTipMessage>{message}</ToolTipMessage>}
        </TooltipWrapper>
    );
};

const TooltipWrapper = styled.div`
    position: relative;
    display: inline-block;
    margin-left: 0.5rem;
`;

const TooltipIcon = styled.div`
    background-color: #4d3c7b;
    color: white;
    font-weight: bold;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
    user-select: none;

    &:hover {
        background-color: #c79d0a;
    }
`;

const ToolTipMessage = styled.div`
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    background-color: #2a1f51;
    color: white;
    padding: 0.75rem;
    border: 1px solid #4d3c7b;
    border-radius: 6px;
    font-size: 12px;
    font-family: Barlow, sans-serif;
    line-height: 1.4;
    z-index: 10;
    white-space: pre-line;
    min-width: 200px;
    max-width: 250px;
    margin-left: 0.5rem;
`;

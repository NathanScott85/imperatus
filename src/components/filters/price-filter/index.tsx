import React from "react";
import styled from "styled-components";

interface PriceSliderProps {
    filters: any;
    priceMin: number;
    priceMax: number;
    selectedPriceMin: number;
    selectedPriceMax: number;
    onPriceChange: (min: number, max: number) => void;
}

export const PriceSlider: React.FC<PriceSliderProps> = ({
    priceMin,
    priceMax,
    selectedPriceMin,
    selectedPriceMax,
    onPriceChange,
}) => {
    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = Number(e.target.value);
        if (newMin < selectedPriceMax) {
            onPriceChange(newMin, selectedPriceMax);
        }
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = Number(e.target.value);
        if (newMax > selectedPriceMin) {
            onPriceChange(selectedPriceMin, newMax);
        }
    };

    return (
        <FilterSection>
            <FilterTitle>Price Range</FilterTitle>
        <SliderContainer>
            <SliderWrapper>
                <StyledInput
                    type="range"
                    min={priceMin}
                    max={priceMax}
                    value={selectedPriceMin}
                    onChange={handleMinChange}
                />
                <StyledInput
                    type="range"
                    min={priceMin}
                    max={priceMax}
                    value={selectedPriceMax}
                    onChange={handleMaxChange}
                />
            </SliderWrapper>
            <RangeLabel>£{Math.round(selectedPriceMin)} - £{Math.round(selectedPriceMax)}</RangeLabel>
        </SliderContainer>
        </FilterSection>
    );
};

const FilterTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 16.2px;
    font-weight: 400;
    margin-bottom: 0.75rem;
    color: black;

`;

const FilterSection = styled.div`
    margin-bottom: 1.35rem;
    font-family: Cinzel;
    font-size: 18px;
    font-weight: 500;
    line-height: 25px;
    letter-spacing: 0.02em;
    text-align: left;
`;

const SliderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
`;

const SliderWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    
    input {
        flex: 1;
        appearance: none;
        height: 5px;
        background: #e5def9; /* Track color */
        border-radius: 5px;
        outline: none;
        cursor: pointer;
        position: absolute;
        width: 100%;
    }
`;

const StyledInput = styled.input`
    appearance: none;
    width: 100%;
    background: transparent;
    position: absolute;
    pointer-events: none;

    &::-webkit-slider-runnable-track {
        height: 5px;
        background: #e5def9;
        border-radius: 5px;
    }

    &::-webkit-slider-thumb {
        appearance: none;
        width: 18px;
        height: 18px;
        background: #AC8FFF; /* Requested thumb color */
        border-radius: 50%;
        cursor: pointer;
        pointer-events: auto; /* Allow interaction with the thumb */
        position: relative;
        margin-top: -7px; /* Centers the thumb over the track */
        z-index: 5;
    }
`;

const RangeLabel = styled.label`
    font-family: Cinzel, serif;
    font-size: 14px;
    font-weight: 400;
    margin-top: 0.45rem;
    margin-bottom: 0.45rem;
    color: black;
`;

export default PriceSlider;

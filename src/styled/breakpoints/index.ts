export interface Breakpoints {
    sm: number;
    md: number;
    lg: number;
    xl: number;
}

export const breakpoints: Breakpoints = {
    sm: 20,
    md: 30,
    lg: 45,
    xl: 60,
};

export const mediaQueries = (key: keyof typeof breakpoints) => {
    return (style: TemplateStringsArray | string) =>
        `@media (min-width: ${breakpoints[key]}em) { ${style} }`;
};

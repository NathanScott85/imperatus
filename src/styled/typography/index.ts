
export interface Typography {
    fontWeights: FontWeights;
    fontSizes: FontSizes;
    fonts: Fonts;
}

export interface FontWeights {
}
export interface FontSizes {
}

export interface Fonts {
    Barlow: string;
    Cinzel: string;
}

export const typography: Typography = {
    fontWeights: {},
    fontSizes: {},
    fonts: {
        Barlow: 'Barlow, sans-serif',
        Cinzel: 'Cinzel, serif'
    },
}

export const fontWeights: FontWeights = {
}

export const fontSizes: FontSizes = {
}
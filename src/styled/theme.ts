import { createTheme } from '@mui/system';
import { createGlobalStyle } from 'styled-components';
import { Colors, colors } from './colors';
import { Spacing, spacing } from './spacing';
import { Typography, typography } from './typography';
import { LineHeights, lineHeights } from './line-heights';
import { Breakpoints, breakpoints } from './breakpoints';

export interface Palette {
    colors: Colors;
    spacing: Spacing;
    typography: Typography;
    breakpoints: Breakpoints;
    lineHeights: LineHeights;
}

const palette: Palette = {
    colors,
    spacing,
    typography,
    breakpoints,
    lineHeights,
};
const theme = createTheme({
    palette,
});

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: ${theme.palette.spacing[0]};
        font-family: 'Barlow', sans-serif;
        font-size: 0.75rem;
    }

    html, body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
    }

    h1, h2, h3, h4, h5, h6 {
        font-size: 1rem;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

export { theme, GlobalStyle };

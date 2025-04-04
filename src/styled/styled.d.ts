import { Theme } from 'styled-components';

import theme from './theme';

declare module 'styled-components' {
    type Theme = typeof theme;
    export interface DefaultTheme extends Theme {
        palette: {
            colors: {};
            spacing: {
                0: string;
                8: string;
                16: string;
                24: string;
                32: string;
                40: string;
            };
        };
    }
}

import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

/**
 * Global styles for the application
 */
export const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    body {
        font-family: open sans;
        color: ${theme.colors.primary};
        background-color: ${theme.colors.background};
    }

    #root {
        position: relative;
        min-height: 100vh;
    }
`;
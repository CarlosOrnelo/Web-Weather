import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    *,
    *::after,
    *::before {
        box-sizing: border-box;
    }

    body {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        margin: 0;
        padding: 0;
        transition: all 0.25s linear;
      }
      
    #root {
        display: grid;
        height: 100vh;
        width: 100vw;
        grid-template-areas: 
                            "header"
                            "main"
                            "footer";
        grid-template-rows: 7% auto 5%
    };`
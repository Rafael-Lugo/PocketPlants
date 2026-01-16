import styled, { createGlobalStyle } from "styled-components";
import { Exo } from "next/font/google";

export const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "700", "600"],
});

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

   :root{
    --background: #F0F4E9;
    --background-foreground: #b2d024;
    --background-ground: #FFFFFF;
    --color: #003333;
    --primary: #5F7B02;
    --accent: #14ddce;
    --secondary: #096830;
    --terciary: #99CC99;
    --alert: #AA2929;
    --alert-secondary: #651B1B;
    --mute: #F8F8F8;
  }

   html, body {
    margin: 0;
    padding: 0 0px 0;
    overflow-x: hidden;


    font-family: ${exo.style.fontFamily};
    
    background: var(--background);
    color: var(--color);
  }

  main {
  padding-bottom: 160px;
}
 
`;

export const Titel = styled.h1`
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
`;

export const Subtitle = styled.h2`
  text-align: center;
  font-size: 1.69rem;
  font-weight: 400;
`;

export const AppShell = styled.main`
  position: relative;
  z-index: 1; 
`;

export const HeaderWrapper = styled.header`
display: flex;
align-items: center;
justify-content: center;
gap: 1.25rem;
text-align: left;
padding: 0 1rem;
margin:2rem auto 0.5rem;
`

export const AppIconWrapper = styled.span`
  display: grid;
  place-items: center;
  

  svg {
    width: 72px;
    height: 72px;
  }

  `
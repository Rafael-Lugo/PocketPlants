import { createGlobalStyle } from "styled-components";
import { Exo } from "next/font/google";

export const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

   :root{
    --background: #FCFBEC;
    --background-foreground: #b2d024;
    --color: #003333;
    --primary: #5F7B02;
    --accent: #14ddce;
    --secondary: #096830;
    --terciary: #99CC99
  }

   body {
    margin: 0;
    font-family: ${exo.style.fontFamily};
  }

`;
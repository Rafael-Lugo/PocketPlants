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
    --background: #fff;
    --background-foreground: #949494ff;
    --color: #000000ff;
    --color-primary: #3a3a3aff;
    --color-accent: #922d2dff;
  }

   body {
    margin: 0;
    font-family: ${exo.style.fontFamily};
  }


`;
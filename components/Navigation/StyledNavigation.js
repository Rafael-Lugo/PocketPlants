import Link from "next/link";
import styled from "styled-components";

import LeafIcon from "@/public/symbol/leaf-symbol.svg"

export const NavigationWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;

  width: 100vw;
  margin: 0 auto;
  z-index: 1000;

  display: flex;
  justify-content: center;

  min-height: 150px;
  padding: 3.2rem 0 calc(1rem + env(safe-area-inset-bottom));

  background: linear-gradient(
    to top,
    var(--background) 75%,
    rgba(0, 0, 0, 0) 100%
  );
`;

export const NavigationList = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  max-width: min(420px, 100%);
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-self: center;
  list-style: none;
  gap: 0.5rem;
  z-index: 2;
`;

export const NavigationItem = styled.li`
  text-decoration: none;
  margin: 0;

  & > a[aria-current="page"] {
    box-shadow: 0px 9px 7px rgba(0, 0, 0, 0.33);
    transform: translateY(-4px);
  }
`;

export const NavigationLink = styled(Link)`
  display: flex;
  justify-content: center;

  padding: 0.5rem;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;

  background: var(--primary);
  border-radius: 50px;

  box-shadow: 0px 6px 6px rgba(0, 5, 10, 0.25);
  transform: translateY(0);

  transition: transform 0.09s ease, box-shadow 0.09s ease;

  &:hover {
    box-shadow: 0px 8px 7px rgba(0, 0, 0, 0.25);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.33);
  }

  svg path {
    fill: ${({ $highlighted }) =>
      $highlighted ? "var(--accent)" : "var(--background-foreground)"};
  }

  &:hover svg path {
    fill: var(--accent);

    box-shadow: 5px 6px 7px rgba(0, 0, 0, 0.33);
  }
`;

export const ButtonWrapper = styled.div`
  display: grid;
  justify-items: end;
  margin-right: 15px;
`;

export const ButtonLink = styled(Link)`
  align-items: end;
  justify-content: center;
  padding: 12px 18px;
  border-radius: 999px;
  justify-items: center;

  background-color: var(--primary);
  color: var(--background-foreground);

  font-weight: 600;
  text-decoration: none;

  cursor: pointer;

  svg path {
    fill: var(--background-foreground);
  }

  &:hover {
    background-color: var(--accent);

    svg path {
      fill: var(--color);
    }
  }
`;

export const Leaf = styled(LeafIcon)`
position: fixed;
width: 140px;
height: auto;

color: var(--terciary);
opacity: 0.5;
pointer-events: none;

z-index: 0;


`

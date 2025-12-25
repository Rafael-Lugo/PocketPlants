import Link from "next/link";
import styled from "styled-components";

export const NavigationWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  list-style: none;

  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--background-foreground);
  
`;

export const NavigationList = styled.ul`
  display: flex;
  justify-content: center;
  align-self: center;
  list-style: none;
`;

export const NavigationItem = styled.li`
  text-decoration: none;
  margin: 0;
`;

export const NavigationLink = styled(Link)`
  display: flex;
  justify-content: center;

  padding: 0.5rem;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;

  &:hover{
    color: var(--color-accent);
  }
`;

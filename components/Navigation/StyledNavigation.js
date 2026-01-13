import Link from "next/link";
import styled from "styled-components";

export const NavigationWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(
    to top,
    var(--background) 75%,
    rgba(0, 0, 0, 0) 100%
  );
  padding: 1rem 0;
`;

export const NavigationList = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
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

  svg path {
    fill: ${({ $highlighted }) =>
      $highlighted ? "var(--accent)" : "var(--primary)"};
  }

  &:hover svg path {
    fill: var(--accent);
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

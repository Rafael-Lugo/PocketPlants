import styled from "styled-components";

export const ButtonInput = styled.button`
  border: none;
  cursor: pointer;
  align-content: center;
  align-items: center;

  height: 35px;
  width: 30%;
  border-radius: 16px;

  color: var(--background-foreground);
  background: var(--color);

  transform: translateY(0);
  transition: transform 0.3s ease;

  &:hover {
    color: var(--color);
    background: var(--accent);

    box-shadow: 0px 8px 7px rgba(0, 0, 0, 0.25);
    transform: translateY(-2px);
    transition: transform 0.3s ease;
  }

  &:active {
    color: var(--background-foreground);
    background: var(--secondary);

    transform: translateY(1px);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.33);
    transition: transform 0.3s ease;
  }
`;

export const DeleteButton = styled.button`
  border: none;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-top: 28px;

  height: 60px;
  width: 60px;
  border-radius: 50px;

  color: var(--background-foreground);
  background: var(--primary);

  transform: translateY(0px);
  transition: transform 0.3s ease;

  svg {
    fill: var(--background-foreground);
  }

  &:hover {
    color: var(--background);
    background: var(--alert);

    box-shadow: 0px 8px 7px rgba(0, 0, 0, 0.25);
    transform: translateY(-2px);
    transition: transform 0.3s ease;

    svg {
      fill: var(--background);
    }
  }

  &:active {
    color: var(--background);
    background: var(--alert-secondary);

    transform: translateY(2px);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.33);
    transition: transform 0.3s ease;

    svg {
      fill: var(--background);
    }
  }
`;


export const SaveButton = styled.button`

`
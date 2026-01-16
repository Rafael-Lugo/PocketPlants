import styled from "styled-components";

export const PlantFormWrapper = styled.form`
  width: min(980px, calc(100% - 2rem));
  margin: 1.25rem auto;
  padding: 1.25rem;

  background: var(--background-ground);
  border-radius: 36px;
  box-shadow: 0px 6px 6px rgba(0, 5, 10, 0.25);

  display: grid;
  gap: 1.1rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
    gap: 1.25rem;
  }
`;

export const FormGroup = styled.label`
  display: grid;
  gap: 0.5rem;

  font-size: 1.19rem;
  font-weight: 600;
  color: var(--color);

  input,
  select,
  textarea {
    width: 100%;
    border: 2px solid transparent;
    outline: none;

    background: var(--mute);
    color: var(--color);

    border-radius: 18px;
    padding: 0.85rem 1rem;
    box-shadow: 0px 4px 6px rgba(0, 5, 10, 0.18);

    font-size: 1.05rem;
  }

  textarea {
    min-height: 140px;
    resize: vertical;
    line-height: 1.35;
    font-size: 0.87rem;
  }

  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    border-color: var(--accent);
    background: var(--mute);
  }

  input:hover,
  select:hover,
  textarea:hover {
    border-color: var(--background-foreground);
  }
`;

export const Fieldset = styled.fieldset`
  border: 0;
  padding: 0;

  display: grid;
  gap: 0.75rem;

  legend {
    font-size: 1.19rem;
    font-weight: 600;
    color: var(--color);
    margin-bottom: 0.25rem;
  }
`;

export const CheckboxGrid = styled.div`
  display: grid;
  gap: 0.6rem;

  @media (min-width: 520px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  background: var(--mute);
  border-radius: 18px;
  padding: 0.75rem 0.9rem;
  box-shadow: 0px 4px 6px rgba(0, 5, 10, 0.18);

  color: var(--color);
  font-weight: 500;

  border: 2px solid transparent;

  input {
    width: 18px;
    height: 18px;
    box-shadow: none;
    padding: 0;
    margin: 0;
  }

  &:hover {
    border-color: var(--background-foreground);
  }

  &:focus-within {
    border-color: var(--accent);
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.25rem;
`;

export const ButtonInput = styled.button`
  border: 0;
  cursor: pointer;

  padding: 0.9rem 1.25rem;
  border-radius: 9999px;

  background: var(--primary);
  color: var(--background-foreground);

  font-size: 1.1rem;
  font-weight: 500;

  transform: translateY(0);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: var(--accent);
    color: var(--color);

    transform: translateY(-2px);
    box-shadow: 0px 8px 14px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: var(--background-foreground);
    color: var(--primary);

    transform: translateY(1px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.18);
  }
`;

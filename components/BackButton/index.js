import { useRouter } from "next/navigation";
import styled from "styled-components";

export default function BackButton() {
  const router = useRouter();

  return (
    <StyledBackButton type="button" onClick={() => router.back()}>
      Back
    </StyledBackButton>
  );
}

const StyledBackButton = styled.button`
  background-color: var(--primary);
  color: var(--background-foreground);
  border: none;
  cursor: pointer;
  display: inline-grid;
  justify-content: end;

  &:hover {
    background-color: var(--accent);
    color: var(--color);
  }
`;

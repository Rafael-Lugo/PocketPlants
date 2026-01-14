import styled from "styled-components";

export const TitelPage = styled.h1`
  align-self: flex-start;
  margin-left: 30px;
  margin-bottom: 0;
  font-size: 1.69;
  font-weight: 700;
`;

export const SubtitlePage = styled.h2`
  margin-left: 30px;
  margin-top: 0;
  font-size: 1.5rem;
  font-weight: 400;
`;

export const ContentCard = styled.section`
  display: grid;
  grid-template-columns: minmax(140px, 45%) 1fr;
  gap: 1.25rem;

  background: var(--background-ground);
  border-radius: 36px;
  padding: 1.25rem;

  box-shadow: 0px 6px 6px rgba(0, 5, 10, 0.25);

  align-items: start;
  width: min(980px, calc(100% - 2rem));
  margin: 1.25rem auto;

  @media (min-width: 768px) {
    grid-template-columns: minmax(280px, 360px) 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  @media (max-width: 360px) {
    grid-template-columns: 130px 1fr;
    gap: 1rem;
    padding: 1rem;
    border-radius: 36px;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 50%;
  aspect-ratio: 3 / 4;
  border-radius: 22px;
  overflow: hidden;

  right: 1rem;

  box-shadow: 0px 10px 18px rgba(0, 5, 10, 0.18);
`;

export const TextWrapper = styled.div`
  display: grid;
  align-content: end;
  gap: 0.75rem;
  min-width: 0;

  p{
    margin: 0;
    line-height: 1.35;
  }
`;

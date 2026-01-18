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
  grid-template-columns: 1fr;
  gap: 0.5rem;

  background: var(--background-ground);
  border-radius: 36px;
  padding: 1.25rem;

  box-shadow: 0px 6px 6px rgba(0, 5, 10, 0.1);

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
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 22px;
  overflow: hidden;

  right: 0.5rem;

  box-shadow: 0px 8px 10px rgba(0, 5, 10, 0.25);
`;

export const TextWrapper = styled.div`
  display: grid;
  align-content: end;
  gap: 0.75rem;
  min-width: 0;

  p {
    margin: 0;
  }
`;

export const ContentWrapper = styled.ul`
  display: grid;
  list-style: none;

  margin: 1.25rem auto 0;
  padding: 0;
  gap: 1.25rem;

  justify-items: center;
`;

export const ContentItem = styled.li`
  display: grid;
  width: min(860px, calc(100% - 2.5rem));
  border-radius: 25px;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  background: var(--background-ground);

  padding: 0.95rem 1.4rem;
  gap: 0.75rem;

  box-shadow: 0px 6px 6px rgba(0, 5, 10, 0.1);

  @media (max-width: 420px) {
    width: min(820px, calc(100% - 1.75rem));
    padding: 0.85rem 1.1rem;
  }

  & > span {
    display: grid;
    place-items: center;
  }

  & img {
    display: block;
  }
`;

export const ContentText = styled.span`
  justify-self: start;
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color);
  white-space: nowrap;

  @media (max-width: 420px) {
    font-size: 1.1rem;
  }
`;

export const ContenLabel = styled.span`
  justify-self: start;
  text-align: right;

  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color);
  white-space: nowrap;

  @media (max-width: 420px) {
    font-size: 1.1rem;
  }
`;

export const ContentIcons = styled.span`
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.75rem;
  min-width: 10rem;
`;

export const IconItem = styled.span`
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    display: block;
    object-fit: contain;
  }
`;

export const IconWithLabel = styled.span`
  display: grid;
  grid-template-columns: 32px auto;
  align-items: center;
  column-gap: 0.75rem;
  width: 100%;
`;

export const IconLabel = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color);
  line-height: 1;
  white-space: nowrap;
`;

export const ActionBar = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  width: min(860px, calc(100% - 2.5rem));
  margin: 2rem auto 0;
`;

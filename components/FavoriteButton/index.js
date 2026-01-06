import FavoriteIcon from "public/assets/icons/leaf.svg";
import styled from "styled-components";

export default function FavoriteButton({ isFavorite, onToggle }) {
  return (
    <FavoriteButtonWrapper
      type="button"
      onClick={onToggle}
      aria-label={isFavorite ? "unlike" : "like"}
      $isFavorite={isFavorite}
    >
      <FavoriteIcon width={84} height={84} />
    </FavoriteButtonWrapper>
  );
}

export const FavoriteButtonWrapper = styled.button`
  background: none;
  cursor: pointer;
  border: none;
  padding: 0;
  rotate: 50deg;
  filter: drop-shadow(1px 0px 5px rgba(0, 0, 0, 0.36));
  
  svg {
    fill: ${({ $isFavorite }) => ($isFavorite ? "var(--accent)" : "var(--terciary)")};
    transition: fill 0.2s ease, stroke 0.2s ease;
    
  }

  &:hover svg path {
    fill: var(--accent);
  }
  `
import styled from "styled-components";
import { useRef } from "react";

import Search from "public/assets/icons/search.svg";
import Close from "public/assets/icons/close.svg";

export default function SearchBar({
  search,
  setSearch,
  isMenuActive,
  setIsMenuActive,
}) {
  const inputRef = useRef(null);

  function toggleSearch() {
    setIsMenuActive((prev) => !prev);
  }

  function handleSearch(event) {
    setSearch(event.target.value.toLowerCase());
  }

  function handleRemove() {
    setSearch("");
    inputRef.current?.focus();
  }

  return (
    <SearchContainer>
      <Viewport>
        <Bar $isOpen={isMenuActive}>
          <SearchInput
            ref={inputRef}
            type="search"
            placeholder="Search plants..."
            value={search}
            onChange={handleSearch}
            $isOpen={isMenuActive}
          />
          <RemoveButton
            type="button"
            onClick={handleRemove}
            $isOpen={isMenuActive}
            aria-label="Remove search text"
          >
            remove
          </RemoveButton>

          <IconButton
            type="button"
            aria-label="Toggle search"
            onClick={toggleSearch}
          >
            {isMenuActive ? (
              <Close alt="Close search" width={48} height={48} />
            ) : (
              <Search alt="Open search" width={48} height={48} />
            )}
          </IconButton>
        </Bar>
      </Viewport>
    </SearchContainer>
  );
}

const CLOSED_VISIBLE = 64;


const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 12px;
  overflow: hidden;

  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(-30px)")};
  transition: transform 0.35s ease;
`;

const Viewport = styled.div`
  width: 100%;
  overflow: hidden;

  padding: 0 12px;
  box-sizing: border-box;
`;

const Bar = styled.div`
  display: flex;
  align-items: center;

  height: 64px;
  max-width: 680px;
  width: min(100%, 360px);

  background: var(--primary);
  border-radius: 0 50px 50px 0;
  padding: 8px;

  transform: ${({ $isOpen }) =>
    $isOpen
      ? "translateX(0)"
      : `translateX(calc(-100% + ${CLOSED_VISIBLE}px))`};

  transition: transform 0.35s ease;
  will-change: transform;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 48px;
  min-width: 0;

  border-radius: 999px;
  border: 3px solid var(--accent);
  padding: 0 10px;
  margin-left: 10px;

  background: var(--background-ground);
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
`;

const IconButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 999px;

  border: none;
  background: transparent;

  display: grid;
  place-items: center;

  margin-left: 12px;
  cursor: pointer;

  color: var(--background-foreground);

  svg {
    display: block;
    width: 48px;
    height: 48px;

    &:hover {
      color: var(--accent);
    }
  }

`;

const RemoveButton = styled.button`
  height: 35px;
  border-radius: 16px;
  border: none;
  padding: 0 16px;

  color: var(--background-foreground);
  background: var(--color);
  transform: translateY(0);

  margin-left: 12px;

  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};

  &:hover{
    background: var(--background-foreground);
    color: var(--color);

    box-shadow: 0px 8px 7px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.33);
  }

`;

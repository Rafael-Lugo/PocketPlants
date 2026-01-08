import styled from "styled-components";
import Search from "public/assets/icons/Search.svg";
import { useRef } from "react";

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
            onChange={(event) => setSearch(event.target.value)}
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
          <Search alt="" width="32" height="32" />
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
  padding: 12px 0;
`;

const Viewport = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Bar = styled.div`
  display: flex;
  align-items: center;

  height: 64px;
  max-width: 680px;
  width: min(680px, 100%);

  background: var(--primary);
  border-radius: 999px;
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

  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  padding: 0 16px;

  background: var(--background-ground);
   pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
`;



const RemoveButton = styled.button`
  height: 48px;
  border-radius: 16px;
  border: none;
  padding: 0 16px;

  background: rgba(255, 255, 255, 0.6);

  margin-left: 12px;

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
`;

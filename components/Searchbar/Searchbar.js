import styled from "styled-components";

export default function SearchBar({ search, setSearch }){
    function handleSearch(searchString){
        setSearch(searchString);
    }

    return(
        <SearchBarWrapper>
         <SearchInput
        type="search"
        placeholder="Search plants..."
        value={search}
        onChange={(event) => handleSearch(event.target.value)}
      />
      <button type="button" onClick={() => handleSearch("")}>
        remove
      </button>
        </SearchBarWrapper>
    )
}

export const SearchBarWrapper = styled.div`
  display: flex;
  align-items: start;
  background-color: var(--primary);`

  export const SearchInput = styled.input`
  border: 1px solid var(--primary);
  background-color: var(--background-ground);
  `
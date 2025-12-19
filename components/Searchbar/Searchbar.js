export default function SearchBar({ search, setSearch }){
    function handleSearch(searchString){
        setSearch(searchString);
    }

    return(
        <>
         <input
        type="search"
        placeholder="Search plants..."
        value={search}
        onChange={(event) => handleSearch(event.target.value)}
      />
      <button type="button" onClick={() => handleSearch("")}>
        remove
      </button>
        </>
    )
}
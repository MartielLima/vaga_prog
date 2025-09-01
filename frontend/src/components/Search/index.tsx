import { useSearch } from "../../context/SearchContext";
import { Search } from "./styled";

function SearchBar() {
  const { search, setSearch } = useSearch();

  return (
    <Search
      type="text"
      placeholder="Pesquisar..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ padding: "8px", width: "250px", borderRadius: "5px", border: "1px solid #ccc" }}
    />
  );
}

export default SearchBar;

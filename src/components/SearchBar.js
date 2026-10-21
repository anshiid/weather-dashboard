function SearchBar({ city, setCity, onSearch, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form className="search-section" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        {city && (
          <button
            type="button"
            className="clear-button"
            onClick={() => setCity("")}
          >
            ×
          </button>
        )}
      </div>

      <button className="search-button" type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
        {!loading && <span>→</span>}
      </button>
    </form>
  );
}

export default SearchBar;
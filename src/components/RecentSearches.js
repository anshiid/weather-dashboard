function RecentSearches({ searches, onSelect }) {
  return (
    <section className="recent-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">YOUR SEARCHES</span>
          <h2>Recent Searches</h2>
        </div>

        <span className="search-count">
          {searches.length} {searches.length === 1 ? "city" : "cities"}
        </span>
      </div>

      {searches.length === 0 ? (
        <div className="empty-searches">
          <span>🔎</span>
          <p>Your searched cities will appear here.</p>
        </div>
      ) : (
        <div className="recent-list">
          {searches.map((search, index) => (
            <button
              className="recent-city"
              key={`${search}-${index}`}
              onClick={() => onSelect(search)}
            >
              <span className="recent-city-icon">📍</span>

              <span>
                <strong>{search}</strong>
                <small>View weather</small>
              </span>

              <span className="recent-arrow">→</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentSearches;
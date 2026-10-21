function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">
        <div className="brand-icon">☀</div>
        <div>
          <h2>കാലാവസ്ഥ</h2>
          <span>Live Weather Dashboard</span>
        </div>
      </div>

      <div className="nav-status">
        <span className="status-dot"></span>
        Live Data
      </div>
    </nav>
  );
}

export default Navbar;
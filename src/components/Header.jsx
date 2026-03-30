export default function Header({ onNewTicket, searchQuery, onSearchChange }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">
          <span className="logo-icon">🎫</span> WalletPass
        </h1>
      </div>
      <div className="header-center">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search events or venues..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="header-right">
        <button className="btn btn-primary" onClick={onNewTicket}>
          + New Pass
        </button>
      </div>
    </header>
  );
}

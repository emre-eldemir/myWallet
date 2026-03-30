export default function EmptyState({ onCreateFirst }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">🎫</div>
      <h2>No passes yet</h2>
      <p>Create your first digital pass to get started!</p>
      <button className="btn btn-primary" onClick={onCreateFirst}>
        + Create Your First Pass
      </button>
    </div>
  );
}

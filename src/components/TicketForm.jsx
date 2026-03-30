import { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm';
import TicketPreview from './TicketPreview';

const TICKET_COLORS = [
  '#1A1714', '#C9A84C', '#E74C3C', '#3498DB', '#2ECC71',
  '#9B59B6', '#F39C12', '#1ABC9C', '#E91E63', '#607D8B',
];

const emptyForm = {
  eventName: '',
  categoryId: '',
  date: '',
  time: '',
  venue: '',
  seat: '',
  holderName: '',
  note: '',
  color: '#1A1714',
};

export default function TicketForm({
  categories,
  getCategoryById,
  onAddCategory,
  onSave,
  onClose,
  editTicket,
}) {
  const [formData, setFormData] = useState(emptyForm);
  const [showNewCategory, setShowNewCategory] = useState(false);

  useEffect(() => {
    if (editTicket) {
      setFormData({
        eventName: editTicket.eventName || '',
        categoryId: editTicket.categoryId || '',
        date: editTicket.date || '',
        time: editTicket.time || '',
        venue: editTicket.venue || '',
        seat: editTicket.seat || '',
        holderName: editTicket.holderName || '',
        note: editTicket.note || '',
        color: editTicket.color || '#1A1714',
      });
    }
  }, [editTicket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.eventName.trim()) return;
    onSave(formData);
  };

  const selectedCategory = getCategoryById(formData.categoryId);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="ticket-form-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="ticket-form-layout">
          <div className="ticket-form-left">
            <h2 className="form-title">
              {editTicket ? 'Edit Pass' : 'Create New Pass'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Event Name *</label>
                <input
                  type="text"
                  name="eventName"
                  className="input"
                  value={formData.eventName}
                  onChange={handleChange}
                  placeholder="e.g. Radiohead Concert"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <div className="category-select-row">
                  <select
                    name="categoryId"
                    className="input"
                    value={formData.categoryId}
                    onChange={handleChange}
                  >
                    <option value="">No category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.emoji} {cat.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-outline btn-small"
                    onClick={() => setShowNewCategory(!showNewCategory)}
                  >
                    {showNewCategory ? 'Cancel' : '+ New'}
                  </button>
                </div>
                {showNewCategory && (
                  <CategoryForm
                    onSave={(cat) => {
                      const newCat = onAddCategory(cat);
                      setFormData((prev) => ({ ...prev, categoryId: newCat.id }));
                      setShowNewCategory(false);
                    }}
                    onCancel={() => setShowNewCategory(false)}
                  />
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    className="input"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    name="time"
                    className="input"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Venue / Location</label>
                <input
                  type="text"
                  name="venue"
                  className="input"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="e.g. Madison Square Garden"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Seat / Section</label>
                <input
                  type="text"
                  name="seat"
                  className="input"
                  value={formData.seat}
                  onChange={handleChange}
                  placeholder="e.g. A-12"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Holder Name</label>
                <input
                  type="text"
                  name="holderName"
                  className="input"
                  value={formData.holderName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Note (optional)</label>
                <textarea
                  name="note"
                  className="input textarea"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="e.g. Doors open at 7:00 PM"
                  rows={2}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Card Color</label>
                <div className="color-picker">
                  {TICKET_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`color-option ${formData.color === c ? 'selected' : ''}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setFormData((prev) => ({ ...prev, color: c }))}
                    />
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editTicket ? 'Save Changes' : 'Create Pass'}
                </button>
                <button type="button" className="btn btn-outline" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <div className="ticket-form-right">
            <TicketPreview formData={formData} category={selectedCategory} />
          </div>
        </div>
      </div>
    </div>
  );
}

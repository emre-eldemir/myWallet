import { useState } from 'react';

const EMOJI_OPTIONS = ['🎵', '🎬', '⚽', '🎭', '🎨', '✈️', '🍽️', '📚', '💼', '🎮', '🏋️', '🎤', '🎪', '🎓', '❤️', '🎁'];
const COLOR_OPTIONS = ['#C9A84C', '#E74C3C', '#3498DB', '#2ECC71', '#9B59B6', '#F39C12', '#1ABC9C', '#E91E63', '#607D8B', '#FF5722'];

export default function CategoryForm({ onSave, onCancel }) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('🎵');
  const [color, setColor] = useState('#C9A84C');

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), emoji, color });
    setName('');
  };

  return (
    <div className="category-form">
      <input
        type="text"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSave();
          }
        }}
      />
      <div className="form-group">
        <label className="form-label">Emoji</label>
        <div className="emoji-picker">
          {EMOJI_OPTIONS.map((em) => (
            <button
              key={em}
              type="button"
              className={`emoji-option ${emoji === em ? 'selected' : ''}`}
              onClick={() => setEmoji(em)}
            >
              {em}
            </button>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Color</label>
        <div className="color-picker">
          {COLOR_OPTIONS.map((c) => (
            <button
              key={c}
              type="button"
              className={`color-option ${color === c ? 'selected' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-primary btn-small" onClick={handleSave}>
          Save
        </button>
        <button type="button" className="btn btn-outline btn-small" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

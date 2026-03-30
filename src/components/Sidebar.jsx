import { useState } from 'react';
import CategoryForm from './CategoryForm';

export default function Sidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
  onDeleteCategory,
  sortOrder,
  onSortChange,
  dateFilter,
  onDateFilterChange,
}) {
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-title">Sort by Date</h3>
        <div className="sort-buttons">
          <button
            className={`sort-btn ${sortOrder === 'asc' ? 'active' : ''}`}
            onClick={() => onSortChange('asc')}
          >
            ↑ Ascending
          </button>
          <button
            className={`sort-btn ${sortOrder === 'desc' ? 'active' : ''}`}
            onClick={() => onSortChange('desc')}
          >
            ↓ Descending
          </button>
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Date Filter</h3>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${dateFilter === 'all' ? 'active' : ''}`}
            onClick={() => onDateFilterChange('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${dateFilter === 'upcoming' ? 'active' : ''}`}
            onClick={() => onDateFilterChange('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`filter-btn ${dateFilter === 'past' ? 'active' : ''}`}
            onClick={() => onDateFilterChange('past')}
          >
            Past
          </button>
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">Categories</h3>
        <ul className="category-list">
          <li>
            <button
              className={`category-item ${selectedCategory === null ? 'active' : ''}`}
              onClick={() => onSelectCategory(null)}
            >
              <span className="category-emoji">📋</span>
              <span>All Passes</span>
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                className={`category-item ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <span className="category-emoji">{cat.emoji}</span>
                <span>{cat.name}</span>
                <span
                  className="category-color-dot"
                  style={{ backgroundColor: cat.color }}
                />
              </button>
              <button
                className="category-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteCategory(cat.id);
                }}
                title="Delete category"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
        <button
          className="btn btn-outline btn-small"
          onClick={() => setShowCategoryForm(!showCategoryForm)}
        >
          {showCategoryForm ? 'Cancel' : '+ Add Category'}
        </button>
        {showCategoryForm && (
          <CategoryForm
            onSave={(cat) => {
              onAddCategory(cat);
              setShowCategoryForm(false);
            }}
            onCancel={() => setShowCategoryForm(false)}
          />
        )}
      </div>
    </aside>
  );
}

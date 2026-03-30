import { useState, useMemo, useEffect } from 'react';
import './App.css';
import { useTickets } from './hooks/useTickets';
import { useCategories } from './hooks/useCategories';
import { isExpired, decodeTicketFromShare } from './utils/helpers';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TicketGrid from './components/TicketGrid';
import TicketForm from './components/TicketForm';
import TicketModal from './components/TicketModal';
import EmptyState from './components/EmptyState';
import SharedPassView from './components/SharedPassView';

function App() {
  const { tickets, addTicket, updateTicket, deleteTicket, clearCategoryFromTickets } = useTickets();
  const { categories, addCategory, deleteCategory, getCategoryById } = useCategories();

  const [showForm, setShowForm] = useState(false);
  const [editTicket, setEditTicket] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [dateFilter, setDateFilter] = useState('all');
  const [sharedPass, setSharedPass] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const passParam = params.get('pass');
    if (passParam) {
      const decoded = decodeTicketFromShare(passParam);
      if (decoded) {
        setSharedPass(decoded);
      }
    }
  }, []);

  const filteredTickets = useMemo(() => {
    let result = [...tickets];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          (t.eventName && t.eventName.toLowerCase().includes(q)) ||
          (t.venue && t.venue.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== null) {
      result = result.filter((t) => t.categoryId === selectedCategory);
    }

    if (dateFilter === 'upcoming') {
      result = result.filter((t) => !isExpired(t.date));
    } else if (dateFilter === 'past') {
      result = result.filter((t) => isExpired(t.date));
    }

    result.sort((a, b) => {
      const dateA = a.date || '';
      const dateB = b.date || '';
      return sortOrder === 'asc'
        ? dateA.localeCompare(dateB)
        : dateB.localeCompare(dateA);
    });

    return result;
  }, [tickets, searchQuery, selectedCategory, sortOrder, dateFilter]);

  const handleSaveTicket = (formData) => {
    if (editTicket) {
      updateTicket(editTicket.id, formData);
    } else {
      addTicket(formData);
    }
    setShowForm(false);
    setEditTicket(null);
  };

  const handleEditTicket = (ticket) => {
    setSelectedTicket(null);
    setEditTicket(ticket);
    setShowForm(true);
  };

  const handleDeleteTicket = (id) => {
    deleteTicket(id);
    setSelectedTicket(null);
  };

  const handleDeleteCategory = (catId) => {
    deleteCategory(catId);
    clearCategoryFromTickets(catId);
    if (selectedCategory === catId) {
      setSelectedCategory(null);
    }
  };

  if (sharedPass) {
    const cat = sharedPass.categoryId ? getCategoryById(sharedPass.categoryId) : null;
    return (
      <SharedPassView
        ticket={sharedPass}
        category={cat}
        onClose={() => {
          setSharedPass(null);
          window.history.replaceState({}, '', window.location.pathname);
        }}
      />
    );
  }

  return (
    <div className="app">
      <Header
        onNewTicket={() => {
          setEditTicket(null);
          setShowForm(true);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className="app-body">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddCategory={addCategory}
          onDeleteCategory={handleDeleteCategory}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
        />
        <main className="main-content">
          {tickets.length === 0 ? (
            <EmptyState
              onCreateFirst={() => {
                setEditTicket(null);
                setShowForm(true);
              }}
            />
          ) : filteredTickets.length === 0 ? (
            <div className="no-results">
              <p>No passes match your filters.</p>
            </div>
          ) : (
            <TicketGrid
              tickets={filteredTickets}
              getCategoryById={getCategoryById}
              onTicketClick={setSelectedTicket}
            />
          )}
        </main>
      </div>

      {showForm && (
        <TicketForm
          categories={categories}
          getCategoryById={getCategoryById}
          onAddCategory={addCategory}
          onSave={handleSaveTicket}
          onClose={() => {
            setShowForm(false);
            setEditTicket(null);
          }}
          editTicket={editTicket}
        />
      )}

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          category={getCategoryById(selectedTicket.categoryId)}
          onClose={() => setSelectedTicket(null)}
          onEdit={handleEditTicket}
          onDelete={handleDeleteTicket}
        />
      )}
    </div>
  );
}

export default App;

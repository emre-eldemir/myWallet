const TICKETS_KEY = 'passkit_tickets';
const CATEGORIES_KEY = 'passkit_categories';

export function getTickets() {
  try {
    const data = localStorage.getItem(TICKETS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveTickets(tickets) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

export function getCategories() {
  try {
    const data = localStorage.getItem(CATEGORIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveCategories(categories) {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

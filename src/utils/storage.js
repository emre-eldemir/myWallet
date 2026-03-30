const TICKETS_KEY = 'passkit_tickets';
const CATEGORIES_KEY = 'passkit_categories';
const MAX_TICKETS = 1000;
const MAX_CATEGORIES = 100;

export function getTickets() {
  try {
    const data = localStorage.getItem(TICKETS_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, MAX_TICKETS);
  } catch {
    return [];
  }
}

export function saveTickets(tickets) {
  if (!Array.isArray(tickets)) return;
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets.slice(0, MAX_TICKETS)));
}

export function getCategories() {
  try {
    const data = localStorage.getItem(CATEGORIES_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, MAX_CATEGORIES);
  } catch {
    return [];
  }
}

export function saveCategories(categories) {
  if (!Array.isArray(categories)) return;
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories.slice(0, MAX_CATEGORIES)));
}

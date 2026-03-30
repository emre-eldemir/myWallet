import { useState, useCallback, useEffect } from 'react';
import { getTickets, saveTickets } from '../utils/storage';
import { generateTicketId } from '../utils/helpers';

export function useTickets() {
  const [tickets, setTickets] = useState(() => getTickets());

  useEffect(() => {
    saveTickets(tickets);
  }, [tickets]);

  const addTicket = useCallback((ticketData) => {
    const newTicket = {
      ...ticketData,
      id: generateTicketId(),
      createdAt: new Date().toISOString(),
    };
    setTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  }, []);

  const updateTicket = useCallback((id, ticketData) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...ticketData } : t))
    );
  }, []);

  const deleteTicket = useCallback((id) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearCategoryFromTickets = useCallback((categoryId) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.categoryId === categoryId ? { ...t, categoryId: null } : t
      )
    );
  }, []);

  return { tickets, addTicket, updateTicket, deleteTicket, clearCategoryFromTickets };
}

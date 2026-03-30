import TicketCard from './TicketCard';

export default function TicketGrid({ tickets, getCategoryById, onTicketClick }) {
  if (tickets.length === 0) {
    return null;
  }

  return (
    <div className="ticket-grid">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          category={getCategoryById(ticket.categoryId)}
          onClick={onTicketClick}
        />
      ))}
    </div>
  );
}

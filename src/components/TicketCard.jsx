import { QRCodeCanvas } from 'qrcode.react';
import { isExpired, formatDate, formatTime } from '../utils/helpers';

export default function TicketCard({ ticket, category, onClick }) {
  const expired = isExpired(ticket.date);
  const cardColor = ticket.color || '#1A1714';

  return (
    <div
      className={`ticket-card ${expired ? 'ticket-expired' : ''}`}
      onClick={() => onClick(ticket)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(ticket)}
    >
      <div className="ticket-card-top" style={{ backgroundColor: cardColor }}>
        <div className="ticket-card-category">
          {category && (
            <>
              <span className="ticket-category-emoji">{category.emoji}</span>
              <span className="ticket-category-name">{category.name}</span>
            </>
          )}
          {!category && ticket.categoryId && (
            <span className="ticket-category-name uncategorized">Uncategorized</span>
          )}
        </div>
        <h3 className="ticket-card-title">{ticket.eventName}</h3>
      </div>
      <div className="ticket-card-perforation" />
      <div className="ticket-card-body">
        <div className="ticket-card-info">
          {ticket.date && (
            <p className="ticket-info-row">
              <span className="info-icon">📅</span>
              {formatDate(ticket.date)}
            </p>
          )}
          {ticket.time && (
            <p className="ticket-info-row">
              <span className="info-icon">🕐</span>
              {formatTime(ticket.time)}
            </p>
          )}
          {ticket.venue && (
            <p className="ticket-info-row">
              <span className="info-icon">📍</span>
              {ticket.venue}
            </p>
          )}
          {ticket.seat && (
            <p className="ticket-info-row">
              <span className="info-icon">💺</span>
              {ticket.seat}
            </p>
          )}
        </div>
        <div className="ticket-card-qr">
          <QRCodeCanvas value={ticket.id} size={64} level="M" />
          <p className="ticket-id">{ticket.id}</p>
        </div>
      </div>
      {expired && <div className="expired-badge">EXPIRED</div>}
    </div>
  );
}

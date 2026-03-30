import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { formatDate, formatTime, slugify } from '../utils/helpers';

export default function SharedPassView({ ticket, category, onClose }) {
  const qrRef = useRef(null);
  const cardColor = ticket.color || '#1A1714';

  const handleDownloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${slugify(ticket.eventName || 'pass')}-pass.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="shared-pass-view">
      <div className="shared-pass-container">
        <h2 className="shared-pass-heading">🎫 Shared Pass</h2>
        <div className="ticket-preview-large">
          <div className="ticket-preview-top" style={{ backgroundColor: cardColor }}>
            <div className="ticket-preview-category">
              {category && (
                <>
                  <span>{category.emoji}</span>
                  <span>{category.name}</span>
                </>
              )}
            </div>
            <h2 className="ticket-preview-title">{ticket.eventName}</h2>
          </div>
          <div className="ticket-card-perforation" />
          <div className="ticket-preview-body">
            <div className="ticket-preview-details">
              {ticket.holderName && (
                <div className="detail-row">
                  <span className="detail-label">Holder</span>
                  <span className="detail-value">{ticket.holderName}</span>
                </div>
              )}
              {ticket.date && (
                <div className="detail-row">
                  <span className="detail-label">Date</span>
                  <span className="detail-value">{formatDate(ticket.date)}</span>
                </div>
              )}
              {ticket.time && (
                <div className="detail-row">
                  <span className="detail-label">Time</span>
                  <span className="detail-value">{formatTime(ticket.time)}</span>
                </div>
              )}
              {ticket.venue && (
                <div className="detail-row">
                  <span className="detail-label">Venue</span>
                  <span className="detail-value">{ticket.venue}</span>
                </div>
              )}
              {ticket.seat && (
                <div className="detail-row">
                  <span className="detail-label">Seat</span>
                  <span className="detail-value">{ticket.seat}</span>
                </div>
              )}
              {ticket.note && (
                <div className="detail-row">
                  <span className="detail-label">Note</span>
                  <span className="detail-value">{ticket.note}</span>
                </div>
              )}
            </div>
            <div className="ticket-preview-qr" ref={qrRef}>
              <QRCodeCanvas value={ticket.id} size={160} level="H" />
              <p className="ticket-id-large">{ticket.id}</p>
            </div>
          </div>
        </div>
        <div className="shared-pass-actions">
          <button className="btn btn-primary" onClick={handleDownloadQR}>
            ⬇ Download QR
          </button>
          <button className="btn btn-outline" onClick={onClose}>
            Go to App
          </button>
        </div>
      </div>
    </div>
  );
}

import { useRef, useCallback } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { formatDate, formatTime, isExpired, encodeTicketForShare, slugify } from '../utils/helpers';

export default function TicketModal({ ticket, category, onClose, onEdit, onDelete }) {
  const qrRef = useRef(null);
  const expired = isExpired(ticket.date);
  const cardColor = ticket.color || '#1A1714';

  const handleDownloadQR = useCallback(() => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    const fileName = `${slugify(ticket.eventName || 'pass')}-pass.png`;
    link.download = fileName;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [ticket.eventName]);

  const handleShare = useCallback(async () => {
    const encoded = encodeTicketForShare(ticket);
    const shareUrl = `${window.location.origin}${window.location.pathname}?pass=${encoded}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Pass: ${ticket.eventName}`,
          text: `Check out this pass for ${ticket.eventName}`,
          url: shareUrl,
        });
      } catch {
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('Share link copied to clipboard!');
      } catch {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Share link copied to clipboard!');
      }
    }
  }, [ticket]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className={`ticket-preview-large ${expired ? 'ticket-expired' : ''}`}>
          <div className="ticket-preview-top" style={{ backgroundColor: cardColor }}>
            <div className="ticket-preview-category">
              {category && (
                <>
                  <span>{category.emoji}</span>
                  <span>{category.name}</span>
                </>
              )}
              {!category && ticket.categoryId && <span>Uncategorized</span>}
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
          {expired && <div className="expired-badge large">EXPIRED</div>}
        </div>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={handleDownloadQR}>
            ⬇ Download QR
          </button>
          <button className="btn btn-outline" onClick={handleShare}>
            🔗 Share
          </button>
          <button className="btn btn-outline" onClick={() => onEdit(ticket)}>
            ✏️ Edit
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(ticket.id)}>
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}

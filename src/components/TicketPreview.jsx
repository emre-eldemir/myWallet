import { QRCodeCanvas } from 'qrcode.react';
import { formatDate, formatTime } from '../utils/helpers';

export default function TicketPreview({ formData, category }) {
  const cardColor = formData.color || '#1A1714';

  return (
    <div className="ticket-preview-card">
      <h4 className="preview-heading">Live Preview</h4>
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
          <h2 className="ticket-preview-title">
            {formData.eventName || 'Event Name'}
          </h2>
        </div>
        <div className="ticket-card-perforation" />
        <div className="ticket-preview-body">
          <div className="ticket-preview-details">
            {formData.holderName && (
              <div className="detail-row">
                <span className="detail-label">Holder</span>
                <span className="detail-value">{formData.holderName}</span>
              </div>
            )}
            {formData.date && (
              <div className="detail-row">
                <span className="detail-label">Date</span>
                <span className="detail-value">{formatDate(formData.date)}</span>
              </div>
            )}
            {formData.time && (
              <div className="detail-row">
                <span className="detail-label">Time</span>
                <span className="detail-value">{formatTime(formData.time)}</span>
              </div>
            )}
            {formData.venue && (
              <div className="detail-row">
                <span className="detail-label">Venue</span>
                <span className="detail-value">{formData.venue}</span>
              </div>
            )}
            {formData.seat && (
              <div className="detail-row">
                <span className="detail-label">Seat</span>
                <span className="detail-value">{formData.seat}</span>
              </div>
            )}
            {formData.note && (
              <div className="detail-row">
                <span className="detail-label">Note</span>
                <span className="detail-value">{formData.note}</span>
              </div>
            )}
          </div>
          <div className="ticket-preview-qr">
            <QRCodeCanvas value="PASS-PREVIEW" size={100} level="M" />
            <p className="ticket-id-large">PASS-XXXXXXXX</p>
          </div>
        </div>
      </div>
    </div>
  );
}

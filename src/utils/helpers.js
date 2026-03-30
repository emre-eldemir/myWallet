import { v4 as uuidv4 } from 'uuid';

export function generateTicketId() {
  const short = uuidv4().replace(/-/g, '').slice(0, 8);
  return `PASS-${short}`;
}

export function generateCategoryId() {
  const short = uuidv4().replace(/-/g, '').slice(0, 8);
  return `cat-${short}`;
}

export function isExpired(dateStr) {
  if (!dateStr) return false;
  const ticketDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return ticketDate < today;
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(timeStr) {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':');
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${m} ${ampm}`;
}

export function encodeTicketForShare(ticket) {
  const jsonStr = JSON.stringify(ticket);
  const bytes = new TextEncoder().encode(jsonStr);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function decodeTicketFromShare(encoded) {
  try {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const jsonStr = new TextDecoder().decode(bytes);
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

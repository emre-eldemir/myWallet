import { v4 as uuidv4 } from 'uuid';

const MAX_STRING_LENGTH = 500;
const MAX_ENCODED_LENGTH = 10000;
const HEX_COLOR_REGEX = /^#[0-9A-Fa-f]{6}$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_REGEX = /^\d{2}:\d{2}$/;

export function sanitizeString(str, maxLength = MAX_STRING_LENGTH) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLength);
}

function isValidColor(color) {
  return typeof color === 'string' && HEX_COLOR_REGEX.test(color);
}

function isValidDate(dateStr) {
  if (!dateStr) return true;
  return typeof dateStr === 'string' && DATE_REGEX.test(dateStr);
}

function isValidTime(timeStr) {
  if (!timeStr) return true;
  return typeof timeStr === 'string' && TIME_REGEX.test(timeStr);
}

export function validateTicketData(ticket) {
  if (!ticket || typeof ticket !== 'object' || Array.isArray(ticket)) return null;

  const allowedKeys = ['id', 'eventName', 'categoryId', 'date', 'time', 'venue', 'seat', 'holderName', 'note', 'color', 'createdAt'];
  const keys = Object.keys(ticket);
  if (keys.some((k) => !allowedKeys.includes(k))) return null;

  if (!ticket.eventName || typeof ticket.eventName !== 'string') return null;
  if (ticket.id && typeof ticket.id !== 'string') return null;
  if (ticket.categoryId && typeof ticket.categoryId !== 'string') return null;
  if (!isValidDate(ticket.date)) return null;
  if (!isValidTime(ticket.time)) return null;
  if (ticket.color && !isValidColor(ticket.color)) return null;

  return {
    id: sanitizeString(ticket.id || '', 20),
    eventName: sanitizeString(ticket.eventName, 200),
    categoryId: sanitizeString(ticket.categoryId || '', 20),
    date: ticket.date ? sanitizeString(ticket.date, 10) : '',
    time: ticket.time ? sanitizeString(ticket.time, 5) : '',
    venue: sanitizeString(ticket.venue || '', 200),
    seat: sanitizeString(ticket.seat || '', 50),
    holderName: sanitizeString(ticket.holderName || '', 100),
    note: sanitizeString(ticket.note || '', MAX_STRING_LENGTH),
    color: ticket.color || '#1A1714',
    createdAt: ticket.createdAt ? sanitizeString(ticket.createdAt, 30) : '',
  };
}

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
    if (typeof encoded !== 'string' || encoded.length > MAX_ENCODED_LENGTH) return null;
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const jsonStr = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(jsonStr);
    return validateTicketData(parsed);
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

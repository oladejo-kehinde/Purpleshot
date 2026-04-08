const DEFAULT_WHATSAPP_LINK = "https://wa.me/2348108912215";
const DEFAULT_INTRO = "Hello Purpleshot Studio,";

const compactLines = (lines) => lines.filter(Boolean).join("\n");

const normalizeWhatsAppBase = (value) => {
  const rawValue = String(value || "").trim();

  if (!rawValue) {
    return DEFAULT_WHATSAPP_LINK;
  }

  if (rawValue.startsWith("https://wa.me/")) {
    const normalizedNumber = rawValue.replace("https://wa.me/", "").replace(/\D/g, "");
    return `https://wa.me/${normalizedNumber}`;
  }

  const normalizedNumber = rawValue.replace(/\D/g, "");
  return `https://wa.me/${normalizedNumber}`;
};

export const getWhatsAppBaseUrl = () =>
  normalizeWhatsAppBase(
    import.meta.env.VITE_WHATSAPP_LINK || import.meta.env.VITE_WHATSAPP_NUMBER
  );

export const createWhatsAppUrl = (whatsAppBaseUrl, message) => {
  const baseUrl = normalizeWhatsAppBase(whatsAppBaseUrl);
  const text = encodeURIComponent(message.trim());

  if (!baseUrl) {
    return "";
  }

  return `${baseUrl}?text=${text}`;
};

export const buildContactWhatsAppMessage = (form) =>
  compactLines([
    DEFAULT_INTRO,
    "",
    "I would like to make an inquiry.",
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.phone ? `Phone: ${form.phone}` : "",
    form.service ? `Service: ${form.service}` : "",
    "",
    "Message:",
    form.message,
  ]);

export const buildRentalWhatsAppMessage = (form, item, rentalLabel) =>
  compactLines([
    DEFAULT_INTRO,
    "",
    "I would like to request a rental booking.",
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    `Item: ${item.name}`,
    `Rental Type: ${rentalLabel}`,
    `Start Date: ${form.startDate}`,
    `End Date: ${form.endDate}`,
    "",
    "Notes:",
    form.notes || "None",
  ]);

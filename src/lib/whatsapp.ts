// Número de WhatsApp de la asesora (México, lada 656).
export const WHATSAPP_NUMBER = "526564590112";
export const WHATSAPP_DISPLAY = "656 459 0112";

export function whatsappLink(message = "Hola, me interesa recibir asesoría para mi tesis.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Agenda de citas de revisión: el alumno propone fecha y hora; todo queda sujeto a confirmación por WhatsApp.

/** Convierte "YYYY-MM-DD" a una fecha local (sin desfase de zona horaria). */
export function parseFecha(valor: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(valor);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

/** La fecha propuesta no puede ser anterior a hoy. */
export function esFechaPropuestaValida(valor: string, ahora: Date) {
  const d = parseFecha(valor);
  if (!d) return false;
  const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
  return d.getTime() >= hoy.getTime();
}

export function formatoFecha(fecha: Date) {
  return fecha.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

/** "HH:MM" (24 h) -> "h:mm am/pm". */
export function formatoHora(valor: string) {
  const m = /^(\d{2}):(\d{2})$/.exec(valor);
  if (!m) return valor;
  const h = Number(m[1]);
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m[2]} ${h < 12 ? "am" : "pm"}`;
}

export function mensajeCita(datos: { nombre: string; correo: string; fecha: string; hora: string }) {
  const fecha = parseFecha(datos.fecha);
  return [
    "Hola, quiero proponer una cita de revisión de tesis.",
    `Nombre: ${datos.nombre.trim()}`,
    `Correo: ${datos.correo.trim()}`,
    `Fecha propuesta: ${fecha ? formatoFecha(fecha) : datos.fecha}`,
    `Hora propuesta: ${formatoHora(datos.hora)}`,
    "Entiendo que la fecha y hora están sujetas a tu confirmación.",
  ].join("\n");
}

export const AVISO_CONFIRMACION = "Entiendo que la fecha y hora están sujetas a tu confirmación.";

/** Asegura que el borrador de la IA lleve el aviso de confirmación y los datos de contacto. */
export function completarBorrador(borrador: string, datos: { nombre: string; correo: string }) {
  let texto = borrador.trim();
  if (!/confirm/i.test(texto)) texto += `\n\n${AVISO_CONFIRMACION}`;
  return `${texto}\n\nNombre: ${datos.nombre.trim()}\nCorreo: ${datos.correo.trim()}`;
}

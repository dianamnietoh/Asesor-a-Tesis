import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { completarBorrador, formatoFecha, formatoHora, parseFecha } from "@/lib/agenda";

const entrada = z.object({
  nombre: z.string().trim().min(2).max(80),
  correo: z.string().trim().email().max(120),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  hora: z.string().regex(/^\d{2}:\d{2}$/),
  dudas: z.string().trim().min(3).max(800),
});

const INSTRUCCIONES = `Redactas mensajes breves de WhatsApp en español de México, en primera persona, de un alumno a su asesora de tesis.
Reglas:
- Empieza con "Hola,". Háblale de tú a la asesora. Máximo 4 oraciones, tono cordial y claro.
- Resume las dudas del alumno sin inventar datos nuevos.
- Menciona la fecha y hora que el alumno solicita como una propuesta.
- Nunca afirmes ni des por hecho que la asesora tiene disponibilidad, ni que la cita está agendada; pide su confirmación.
- No menciones precios, duración, modalidad ni servicios.
- No incluyas nombre, correo ni firma. Devuelve solo el texto del mensaje.`;

export const redactarMensajeCita = createServerFn({ method: "POST" })
  .validator((input: unknown) => entrada.parse(input))
  .handler(async ({ data }) => {
    const { generateResponse, GatewayError } = await import("@lovable.dev/ai-gateway");
    const fecha = parseFecha(data.fecha);
    const solicitud = `Fecha solicitada: ${fecha ? formatoFecha(fecha) : data.fecha}\nHora solicitada: ${formatoHora(data.hora)}\nDudas del alumno: ${data.dudas}`;
    try {
      const res = await generateResponse({
        model: "openai/gpt-6-astra",
        instructions: INSTRUCCIONES,
        input: solicitud,
        max_output_tokens: 400,
      });
      const texto = (res.output ?? [])
        .flatMap((item) => (item.type === "message" ? item.content : []))
        .map((c) => (c.type === "output_text" ? c.text : ""))
        .join("")
        .trim();
      if (!texto) return { ok: false as const, error: "No se pudo redactar el mensaje. Intenta de nuevo." };
      return { ok: true as const, mensaje: completarBorrador(texto, data) };
    } catch (error) {
      if (error instanceof GatewayError) {
        console.error("AI gateway error", error.code, error.httpStatus, error.ids);
        if (error.code === "rate_limited" || error.httpStatus === 429)
          return { ok: false as const, error: "Hay muchas solicitudes en este momento. Intenta en unos minutos." };
        return { ok: false as const, error: "No se pudo redactar el mensaje. Puedes enviar tu propuesta sin redactar." };
      }
      throw error;
    }
  });

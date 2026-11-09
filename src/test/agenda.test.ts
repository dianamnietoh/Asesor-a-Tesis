import { describe, expect, it } from "vitest";
import { esFechaPropuestaValida, formatoHora, mensajeCita } from "@/lib/agenda";

describe("Agenda de citas de revisión", () => {
  it("la solicitud aclara que fecha y hora están sujetas a confirmación", () => {
    const msg = mensajeCita({ nombre: "Ana", correo: "ana@correo.com", fecha: "2026-11-12", hora: "17:30" });
    expect(msg).toContain("Fecha propuesta: jueves, 12 de noviembre de 2026");
    expect(msg).toContain("Hora propuesta: 5:30 pm");
    expect(msg).toContain("sujetas a tu confirmación");
  });

  it("no acepta fechas pasadas", () => {
    const hoy = new Date(2026, 10, 9, 10);
    expect(esFechaPropuestaValida("2026-11-08", hoy)).toBe(false);
    expect(esFechaPropuestaValida("2026-11-09", hoy)).toBe(true);
  });

  it("muestra la hora en formato de 12 horas", () => {
    expect(formatoHora("09:05")).toBe("9:05 am");
    expect(formatoHora("12:00")).toBe("12:00 pm");
  });
});

import { completarBorrador } from "@/lib/agenda";

describe("Borrador redactado con IA", () => {
  it("agrega el aviso de confirmación si la IA lo omitió", () => {
    const t = completarBorrador("Hola, ¿podemos vernos el jueves?", { nombre: "Ana", correo: "ana@correo.com" });
    expect(t).toContain("sujetas a tu confirmación");
    expect(t).toContain("Nombre: Ana\nCorreo: ana@correo.com");
  });

  it("no duplica el aviso si la IA ya pidió confirmación", () => {
    const t = completarBorrador("Hola, quedo atenta a tu confirmación.", { nombre: "Ana", correo: "a@b.co" });
    expect(t.match(/confirmaci/g)).toHaveLength(1);
  });
});

import { useEffect, useState } from "react";
import { CalendarDays, Sparkles } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";

import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { esFechaPropuestaValida, mensajeCita } from "@/lib/agenda";
import { redactarMensajeCita } from "@/lib/agenda.functions";
import { whatsappLink } from "@/lib/whatsapp";

const campo = "mt-2 rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary";

function hoyISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function AgendaRevision() {
  const [minFecha, setMinFecha] = useState<string | undefined>(undefined);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [dudas, setDudas] = useState("");
  const [borrador, setBorrador] = useState<string | null>(null);
  const [redactando, setRedactando] = useState(false);
  const [errorIA, setErrorIA] = useState<string | null>(null);
  const redactar = useServerFn(redactarMensajeCita);

  useEffect(() => setMinFecha(hoyISO()), []);

  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
  const fechaValida = fecha !== "" && esFechaPropuestaValida(fecha, new Date());
  const listo = fechaValida && hora !== "" && nombre.trim().length > 1 && correoValido;

  async function redactarConIA() {
    if (!listo || dudas.trim().length < 3) return;
    setRedactando(true);
    setErrorIA(null);
    try {
      const res = await redactar({ data: { nombre, correo, fecha, hora, dudas } });
      if (res.ok) setBorrador(res.mensaje);
      else setErrorIA(res.error);
    } catch {
      setErrorIA("No se pudo redactar el mensaje. Puedes enviar tu propuesta sin redactar.");
    } finally {
      setRedactando(false);
    }
  }

  function abrirBorrador() {
    if (!borrador?.trim()) return;
    window.open(whatsappLink(borrador.trim()), "_blank", "noopener,noreferrer");
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!listo) return;
    window.open(whatsappLink(mensajeCita({ nombre, correo, fecha, hora })), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={enviar} className="rounded-[2rem] border bg-card p-6 shadow-soft md:p-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col">
          <h3 className="flex items-center gap-2 text-xl font-semibold">
            <CalendarDays className="h-5 w-5 text-primary" /> 1. Propón fecha y hora
          </h3>
          <label className="mt-4 text-sm font-semibold" htmlFor="agenda-fecha">Fecha propuesta</label>
          <input id="agenda-fecha" type="date" min={minFecha} value={fecha} onChange={(e) => setFecha(e.target.value)} required className={campo} />
          {fecha !== "" && !fechaValida && <p className="mt-2 text-sm text-destructive">Elige una fecha de hoy en adelante.</p>}
          <label className="mt-4 text-sm font-semibold" htmlFor="agenda-hora">Hora propuesta</label>
          <input id="agenda-hora" type="time" value={hora} onChange={(e) => setHora(e.target.value)} required className={campo} />
          <p className="mt-4 rounded-xl bg-secondary p-4 text-sm text-secondary-foreground">
            La fecha y hora son una propuesta y están sujetas a confirmación por WhatsApp.
          </p>
        </div>

        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">2. Tus datos</h3>
          <label className="mt-4 text-sm font-semibold" htmlFor="agenda-nombre">Nombre</label>
          <input id="agenda-nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} maxLength={80} required className={campo} />
          <label className="mt-4 text-sm font-semibold" htmlFor="agenda-correo">Correo</label>
          <input id="agenda-correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} maxLength={120} required className={campo} />
          <label className="mt-4 text-sm font-semibold" htmlFor="agenda-dudas">Tus dudas (opcional, para redactar con IA)</label>
          <textarea
            id="agenda-dudas"
            value={dudas}
            onChange={(e) => setDudas(e.target.value)}
            maxLength={800}
            rows={3}
            placeholder="Ej. Quiero revisar mi capítulo de metodología y la forma de citar."
            className={`${campo} resize-y`}
          />
          <button
            type="button"
            onClick={redactarConIA}
            disabled={!listo || dudas.trim().length < 3 || redactando}
            className="btn btn-outline mt-4 w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles className="h-5 w-5" /> {redactando ? "Redactando…" : "Redactar mensaje con IA"}
          </button>
          {errorIA && <p className="mt-2 text-sm text-destructive" role="alert">{errorIA}</p>}
          {borrador !== null && (
            <div className="mt-4 rounded-xl border border-primary/40 bg-secondary/50 p-4">
              <label className="text-sm font-semibold" htmlFor="agenda-borrador">Revisa y edita tu mensaje</label>
              <textarea
                id="agenda-borrador"
                value={borrador}
                onChange={(e) => setBorrador(e.target.value)}
                rows={8}
                maxLength={1500}
                className={`${campo} w-full resize-y`}
              />
              <button type="button" onClick={abrirBorrador} disabled={!borrador.trim()} className="btn btn-whatsapp mt-3 w-full justify-center disabled:opacity-50">
                <WhatsAppIcon /> Abrir WhatsApp con este mensaje
              </button>
            </div>
          )}
          <div className="mt-8">
            <button type="submit" disabled={!listo} className="btn btn-whatsapp w-full justify-center disabled:cursor-not-allowed disabled:opacity-50">
              <WhatsAppIcon /> Enviar propuesta por WhatsApp
            </button>
            <p className="mt-3 text-sm text-muted-foreground">
              Se abrirá WhatsApp con tu propuesta. La cita queda agendada solo cuando recibas la confirmación.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

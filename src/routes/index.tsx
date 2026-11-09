import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpenCheck,
  Compass,
  GraduationCap,
  Lightbulb,
  MessageCircleQuestion,
  Sparkles,
  Users,
} from "lucide-react";

import { AgendaRevision } from "@/components/AgendaRevision";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { whatsappLink } from "@/lib/whatsapp";
import heroImg from "@/assets/hero-tesis.jpg";
import mentoriaImg from "@/assets/mentoria.jpg";
import graduacionImg from "@/assets/graduacion.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Asesoría de Tesis · Acompañamiento personalizado" },
      {
        name: "description",
        content:
          "Asesoría de tesis personalizada. Escríbeme por WhatsApp y cuéntame en qué punto de tu tesis estás.",
      },
      { property: "og:title", content: "Asesoría de Tesis personalizada" },
      {
        property: "og:description",
        content: "Asesoría de tesis personalizada. Consulta por WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const servicios = [
  { icon: Compass, title: "Tu tema", text: "¿Tienes una idea o un tema definido? Compártelo por WhatsApp y platicamos." },
  { icon: BookOpenCheck, title: "Tu avance", text: "Cuéntame en qué etapa de tu tesis estás y qué te gustaría resolver." },
  { icon: MessageCircleQuestion, title: "Tus dudas", text: "Pregunta lo que necesites saber sobre la asesoría antes de decidir." },
];

const pasos = [
  { n: "01", title: "Escríbeme", text: "Envía un mensaje por WhatsApp desde cualquier botón de esta página." },
  { n: "02", title: "Cuéntame tu caso", text: "Comparte tu tema, tu avance o la duda que tengas." },
  { n: "03", title: "Recibe información", text: "Te respondo con los detalles de la asesoría para tu situación." },
  { n: "04", title: "Decide con calma", text: "Con la información completa, eliges si quieres continuar." },
];

const valores = [
  { icon: Lightbulb, title: "Innovación", text: "Tu tesis como una oportunidad de proponer algo nuevo para tu disciplina." },
  { icon: Users, title: "Liderazgo", text: "Te acompaño para que tomes decisiones académicas con criterio propio." },
  { icon: Sparkles, title: "Impacto", text: "Investigación con sentido humano que transforma tu entorno y tu comunidad." },
];

const preguntas = [
  { q: "¿En qué me puede ayudar la asesoría?", a: "Depende de tu tesis y de lo que necesites. Escríbeme por WhatsApp y lo platicamos." },
  { q: "¿Cuáles son los costos, horarios y modalidad?", a: "Esos detalles se comparten directamente por WhatsApp, según tu caso." },
  { q: "¿Cómo empiezo?", a: "Envía un mensaje por WhatsApp con tu tema o tu duda y te respondo." },
];

function WhatsAppButton({ label = "Escríbeme por WhatsApp", variant = "btn-whatsapp", message }: { label?: string; variant?: string; message?: string }) {
  return (
    <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className={`btn ${variant}`}>
      <WhatsAppIcon />
      {label}
    </a>
  );
}

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Encabezado */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-semibold">Asesoría de Tesis</span>
        </div>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Escríbeme por WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full text-whatsapp transition-colors hover:bg-secondary">
          <WhatsAppIcon className="h-6 w-6" />
        </a>
      </header>

      {/* Portada */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-6 lg:grid-cols-[1.1fr_0.9fr] lg:pt-12">
        <div className="animate-rise">
          <p className="eyebrow">Asesoría de tesis personalizada</p>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.05] text-foreground md:text-6xl lg:text-7xl">
            Tu tesis puede <em className="text-primary">transformar</em> tu futuro.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Te acompaño paso a paso para convertir tu investigación en un proyecto con rigor, propósito e impacto, desde la primera idea hasta el día de tu defensa.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <WhatsAppButton />
            <a href="#agenda" className="btn btn-outline">Agendar cita de revisión</a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-foreground">
            <span>✓ Sesiones 1 a 1</span>
            <span>✓ Contacto directo por WhatsApp</span>
          </div>
        </div>
        <div className="relative animate-rise [animation-delay:150ms]">
          <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-sky/40 blur-2xl" />
          <img
            src={heroImg}
            alt="Estudiante trabajando en su tesis en una biblioteca universitaria"
            width={1280}
            height={1600}
            className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-soft"
          />
          <div className="absolute -bottom-6 left-6 right-6 rounded-2xl bg-card p-5 shadow-soft sm:left-auto sm:right-[-1.5rem] sm:w-72">
            <p className="font-display text-lg font-semibold leading-snug">“Del borrador a la defensa, sin perderte en el camino.”</p>
          </div>
        </div>
      </section>

      {/* Narrativa */}
      <section className="bg-ink-gradient text-ink-foreground">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="eyebrow text-sky">Formación con propósito</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
            Investigar es aprender a liderar con ideas. Formamos personas que transforman su entorno.
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {valores.map((v) => (
              <div key={v.title} className="rounded-2xl border border-ink-foreground/15 p-7">
                <v.icon className="h-7 w-7 text-sky" />
                <h3 className="mt-5 text-2xl font-semibold">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-foreground/75">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Consulta</p>
          <h2 className="mt-4 text-4xl font-semibold md:text-5xl">¿En qué punto de tu tesis estás?</h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicios.map((s) => (
            <article key={s.title} className="group rounded-2xl border bg-card p-7 transition-shadow hover:shadow-soft">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Sobre mí */}
      <section className="bg-muted">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 lg:grid-cols-2">
          <img
            src={mentoriaImg}
            alt="Sesión de asesoría de tesis uno a uno"
            width={1280}
            height={960}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-soft"
          />
          <div>
            <p className="eyebrow">La asesoría</p>
            <h2 className="mt-4 text-4xl font-semibold md:text-5xl">Acompañamiento a tu ritmo.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              El objetivo de la asesoría es ayudarte a encontrar claridad en tu investigación, organizar tu tiempo y escribir con confianza.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Cada estudiante tiene un ritmo y una historia distinta; por eso cada asesoría es personalizada.
            </p>
            <div className="mt-8">
              <WhatsAppButton label="Agenda tu primera conversación" />
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="eyebrow">Primer contacto</p>
        <h2 className="mt-4 max-w-2xl text-4xl font-semibold md:text-5xl">Cómo empezar</h2>
        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pasos.map((p) => (
            <li key={p.n} className="border-t-2 border-primary pt-6">
              <span className="font-display text-4xl font-semibold text-primary">{p.n}</span>
              <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Agenda */}
      <section id="agenda" className="mx-auto max-w-6xl scroll-mt-8 px-6 pb-24">
        <p className="eyebrow">Agenda</p>
        <h2 className="mt-4 max-w-2xl text-4xl font-semibold md:text-5xl">Agenda tu cita de revisión</h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Propón una fecha y hora, deja tus datos y envía tu propuesta por WhatsApp. La cita está sujeta a confirmación.</p>
        <div className="mt-10">
          <AgendaRevision />
        </div>
      </section>

      {/* Preguntas */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="flex items-center gap-3">
          <MessageCircleQuestion className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-semibold md:text-4xl">Preguntas frecuentes</h2>
        </div>
        <div className="mt-8 divide-y rounded-2xl border bg-card">
          {preguntas.map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                {f.q}
                <span className="text-2xl text-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Llamado final */}
      <section className="relative isolate overflow-hidden">
        <img src={graduacionImg} alt="Graduada sosteniendo su tesis" width={1280} height={960} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-ink/75" />
        <div className="mx-auto max-w-3xl px-6 py-28 text-center text-ink-foreground">
          <h2 className="text-4xl font-semibold leading-tight md:text-6xl">El día de tu titulación empieza hoy.</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-foreground/85">
            Escríbeme y cuéntame en qué punto de tu tesis estás. Te respondo personalmente.
          </p>
          <div className="mt-10 flex justify-center">
            <WhatsAppButton />
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
        <span>© {new Date().getFullYear()} Asesoría de Tesis</span>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Escríbeme por WhatsApp" className="text-whatsapp">
          <WhatsAppIcon className="h-6 w-6" />
        </a>
      </footer>

      {/* Botón flotante de WhatsApp */}
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Escríbeme por WhatsApp" className="wa-float">
        <WhatsAppIcon className="h-8 w-8" />
      </a>
    </div>
  );
}

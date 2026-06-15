import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Combo Histórias Bíblicas Interativas — 6 histórias por R$24,99" },
      { name: "description", content: "6 histórias bíblicas completas com luvas, atividades, jogos, coroas e plano de aula. Arquivos digitais prontos para imprimir." },
      { property: "og:title", content: "Combo Histórias Bíblicas Interativas" },
      { property: "og:description", content: "6 histórias completas para o ministério infantil. Acesso imediato por R$24,99." },
      { property: "og:image", content: "https://i.postimg.cc/ZKs5G06G/CRIATIVOS-DAS-LUVAS-HISTORIA-VIDA-DE-JESUS-1.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700;800&display=swap" },
    ],
  }),
  component: Landing,
});

const HERO_IMG = "https://i.postimg.cc/ZKs5G06G/CRIATIVOS-DAS-LUVAS-HISTORIA-VIDA-DE-JESUS-1.png";

const HISTORIAS = [
  "https://i.postimg.cc/Rh30PBN6/8.png",
  "https://i.postimg.cc/5yHtPV6t/10.png",
  "https://i.postimg.cc/wMSjZGmw/12.png",
  "https://i.postimg.cc/59GyX6RW/13.png",
  "https://i.postimg.cc/6q7QHXy5/11.png",
  "https://i.postimg.cc/CMt5Rz6W/14.png",
];

// 2 fotos reais do material impresso (reaproveitando imagens disponíveis)
const IMPRESSOS = [
  "https://i.postimg.cc/Rh30PBN6/8.png",
  "https://i.postimg.cc/wMSjZGmw/12.png",
];

const CHECKOUT_URL = "#comprar";

const ITENS = [
  { emoji: "🧤", label: "Luva Interativa", bg: "oklch(0.92 0.12 145)", fg: "oklch(0.32 0.12 145)" },
  { emoji: "📘", label: "Plano de Aula", bg: "oklch(0.9 0.08 240)", fg: "oklch(0.32 0.14 240)" },
  { emoji: "✏️", label: "Atividades Pedagógicas", bg: "oklch(0.94 0.12 90)", fg: "oklch(0.38 0.12 80)" },
  { emoji: "🧠", label: "Jogo da Memória", bg: "oklch(0.9 0.1 310)", fg: "oklch(0.36 0.14 310)" },
  { emoji: "🧩", label: "Quebra-Cabeça", bg: "oklch(0.92 0.11 55)", fg: "oklch(0.4 0.14 50)" },
  { emoji: "👑", label: "Coroa Temática", bg: "oklch(0.91 0.09 25)", fg: "oklch(0.4 0.16 25)" },
  { emoji: "📄", label: "Arquivos PDF", bg: "oklch(0.93 0.05 200)", fg: "oklch(0.35 0.1 220)" },
  { emoji: "🖨️", label: "Pronto para Impressão", bg: "oklch(0.92 0.08 160)", fg: "oklch(0.34 0.12 160)" },
];

function CTA({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={CHECKOUT_URL}
      className={`inline-flex w-full items-center justify-center rounded-full bg-[var(--success)] px-6 py-5 text-base font-extrabold text-white shadow-[0_14px_30px_-10px_oklch(0.7_0.18_145/0.7)] transition hover:bg-[var(--success-hover)] hover:-translate-y-0.5 active:translate-y-0 sm:text-lg ${className}`}
    >
      {children}
    </a>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm font-semibold text-foreground sm:text-base">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--success)] text-[11px] text-white">✓</span>
      <span>{children}</span>
    </li>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[oklch(0.4_0.1_240)] shadow-sm ring-1 ring-[var(--sky-soft)] sm:text-sm">
      <span className="text-[var(--success)]">✓</span>{children}
    </span>
  );
}

function Sparkle({ className = "", char = "⭐" }: { className?: string; char?: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute select-none opacity-70 ${className}`}>
      {char}
    </span>
  );
}

function Carousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const scrollTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const slide = el.children[i] as HTMLElement;
    slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth;
      const i = Math.round(el.scrollLeft / (w * 0.85));
      setIdx(Math.min(HISTORIAS.length - 1, Math.max(0, i)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {HISTORIAS.map((src, i) => (
          <div
            key={i}
            className="relative aspect-square w-[82%] shrink-0 snap-center overflow-hidden rounded-3xl bg-[var(--sky-soft)] shadow-[0_20px_40px_-20px_oklch(0.6_0.1_240/0.4)] ring-4 ring-white sm:w-[55%] md:w-[38%]"
          >
            <img src={src} alt={`História ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[oklch(0.4_0.1_240)] shadow">
              {i + 1} / {HISTORIAS.length}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-center gap-2">
        {HISTORIAS.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir para slide ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={`h-2 rounded-full transition-all ${i === idx ? "w-6 bg-[var(--sky)]" : "w-2 bg-border"}`}
          />
        ))}
      </div>
    </div>
  );
}

function Landing() {
  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--sky-soft)] via-[oklch(0.97_0.04_90)] to-background pb-12 pt-8 sm:pt-12">
        <Sparkle className="left-6 top-10 text-2xl" char="☁️" />
        <Sparkle className="right-8 top-16 text-xl" char="⭐" />
        <Sparkle className="left-10 top-1/2 text-lg" char="🌈" />
        <Sparkle className="right-6 top-1/3 text-lg" char="❤️" />

        <div className="relative mx-auto max-w-md px-5 sm:max-w-2xl">
          <div className="mb-4 flex justify-center">
            <span className="rounded-full bg-[var(--gold)] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[oklch(0.3_0.08_80)] shadow-sm">
              ✨ Ministério Infantil
            </span>
          </div>

          <h1 className="text-center text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            COMBO HISTÓRIAS<br />
            <span className="text-[oklch(0.55_0.15_240)]">BÍBLICAS INTERATIVAS</span>
          </h1>

          <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            6 histórias completas com <b className="text-foreground">luvas bíblicas</b>, atividades pedagógicas, jogos educativos, coroas temáticas e plano de aula prontos para imprimir.
          </p>

          <div className="relative mx-auto mt-6 aspect-square w-full max-w-sm overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_60px_-20px_oklch(0.6_0.15_240/0.4)] ring-4 ring-white">
            <img src={HERO_IMG} alt="Combo Histórias Bíblicas Interativas" className="h-full w-full object-cover" />
            <span aria-hidden className="absolute -left-2 -top-2 rotate-[-15deg] rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-extrabold text-[oklch(0.3_0.08_80)] shadow-md">
              ⭐ Novo
            </span>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Badge>Arquivos Digitais</Badge>
            <Badge>Pronto para Imprimir</Badge>
            <Badge>Acesso Imediato</Badge>
          </div>

          <div className="mt-6 rounded-3xl bg-white p-5 text-center shadow-[0_20px_40px_-20px_oklch(0.6_0.1_240/0.3)] ring-1 ring-border">
            <div className="text-sm font-semibold text-muted-foreground line-through">DE R$49,90</div>
            <div className="mt-1 text-xs font-bold uppercase tracking-wider text-[oklch(0.55_0.15_240)]">por apenas</div>
            <div className="mt-1 text-5xl font-extrabold text-foreground sm:text-6xl">
              R$<span className="text-[oklch(0.5_0.18_145)]">24,99</span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">Pagamento único • Acesso imediato</div>
            <div className="mt-5">
              <CTA>🟢 QUERO MEU COMBO AGORA</CTA>
            </div>
          </div>
        </div>
      </section>

      {/* CARROSSEL */}
      <section className="relative py-12">
        <Sparkle className="left-4 top-6 text-xl" char="⭐" />
        <Sparkle className="right-6 top-10 text-xl" char="☁️" />
        <div className="mx-auto max-w-2xl px-5">
          <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            AS 6 HISTÓRIAS<br className="sm:hidden" /> INCLUÍDAS NO COMBO
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">Arraste para o lado para ver todas →</p>
        </div>
        <div className="mx-auto mt-6 max-w-5xl">
          <Carousel />
        </div>
      </section>

      {/* FOTOS REAIS IMPRESSAS */}
      <section className="relative bg-[oklch(0.98_0.02_90)] py-12">
        <div className="mx-auto max-w-md px-5 sm:max-w-3xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            VEJA COMO O MATERIAL FICA<br className="sm:hidden" /> DEPOIS DE IMPRESSO
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-muted-foreground">
            Fotos reais do material aplicado em sala. 📸
          </p>

          <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
            {IMPRESSOS.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-white shadow-[0_20px_40px_-20px_oklch(0.6_0.1_240/0.35)] ring-4 ring-white"
              >
                <img src={src} alt={`Material impresso ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-[oklch(0.4_0.1_240)] shadow">
                  Foto real
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE ACOMPANHA — CARDS COLORIDOS */}
      <section className="relative bg-[var(--sky-soft)] py-14">
        <Sparkle className="left-6 top-8 text-2xl" char="🌈" />
        <Sparkle className="right-6 top-12 text-xl" char="⭐" />
        <div className="relative mx-auto max-w-md px-5 sm:max-w-3xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            CADA HISTÓRIA<br className="sm:hidden" /> JÁ VEM COMPLETA
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
            Tudo pronto para você aplicar com as crianças. ❤️
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {ITENS.map((it) => (
              <li
                key={it.label}
                className="group flex flex-col items-center justify-center rounded-3xl p-4 text-center shadow-[0_12px_24px_-14px_oklch(0.6_0.1_240/0.35)] ring-4 ring-white transition hover:-translate-y-1"
                style={{ backgroundColor: it.bg }}
              >
                <span className="text-3xl sm:text-4xl">{it.emoji}</span>
                <span
                  className="mt-2 text-xs font-extrabold leading-tight sm:text-sm"
                  style={{ color: it.fg }}
                >
                  {it.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-7 max-w-md">
            <CTA>🟢 QUERO RECEBER AGORA</CTA>
          </div>
        </div>
      </section>

      {/* OFERTA FINAL */}
      <section className="relative bg-gradient-to-b from-background to-[var(--sky-soft)] py-14">
        <Sparkle className="left-5 top-8 text-xl" char="⭐" />
        <Sparkle className="right-5 top-10 text-xl" char="❤️" />
        <div className="relative mx-auto max-w-md px-5">
          <div className="rounded-[2rem] bg-gradient-to-br from-[oklch(0.78_0.12_235)] to-[oklch(0.65_0.16_245)] p-1 shadow-[0_30px_60px_-20px_oklch(0.55_0.15_240/0.5)]">
            <div className="rounded-[1.85rem] bg-white p-6 text-center sm:p-8">
              <div className="inline-block rounded-full bg-[var(--gold)] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[oklch(0.3_0.08_80)]">
                ⭐ Oferta especial
              </div>
              <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
                TUDO ISSO POR APENAS
              </h2>
              <div className="mt-2 text-6xl font-extrabold text-[oklch(0.5_0.18_145)] sm:text-7xl">
                R$24,99
              </div>
              <div className="mt-1 text-xs text-muted-foreground">Pagamento único • Acesso imediato</div>

              <ul className="mx-auto mt-6 grid max-w-xs gap-2.5 text-left">
                <Check>6 Histórias Bíblicas</Check>
                <Check>Luvas Interativas</Check>
                <Check>Atividades Pedagógicas</Check>
                <Check>Jogos Educativos</Check>
                <Check>Coroas Temáticas</Check>
                <Check>Planos de Aula</Check>
                <Check>Arquivos Digitais</Check>
              </ul>

              <div className="mt-7">
                <CTA>🟢 QUERO BAIXAR AGORA</CTA>
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground">🔒 Compra 100% segura</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Histórias Bíblicas Interativas
      </footer>
    </main>
  );
}

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="bg-primary px-5 py-20 text-primary-foreground md:py-28"><div className="mx-auto max-w-7xl reveal"><p className="mb-5 text-xs font-bold uppercase tracking-[.24em] text-gold">{eyebrow}</p><h1 className="max-w-4xl text-5xl font-bold leading-[.95] sm:text-6xl md:text-7xl">{title}</h1><p className="mt-7 max-w-2xl text-base leading-8 text-primary-foreground/75 md:text-lg">{text}</p></div></section>;
}

export function SectionHeading({ eyebrow, title, text, center=false }: { eyebrow?: string; title: string; text?: string; center?: boolean }) {
  return <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>{eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-gold-rich">{eyebrow}</p>}<h2 className="text-4xl font-bold leading-tight text-primary md:text-5xl">{title}</h2>{text && <p className="mt-5 leading-8 text-muted-foreground">{text}</p>}</div>;
}

export function InfoCard({ icon, title, children }: { icon?: ReactNode; title: string; children: ReactNode }) {
  return <article className="border-t-2 border-gold bg-card p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1"><div className="mb-5 text-gold-rich">{icon}</div><h3 className="text-2xl font-bold text-primary">{title}</h3><div className="mt-3 text-sm leading-7 text-muted-foreground">{children}</div></article>;
}

export function CtaBand({ title="Let's inspire a love for learning.", text="Bring meaningful learning-awareness experiences to your school or community." }: { title?: string; text?: string }) {
 return <section className="bg-secondary px-5 py-16"><div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[1fr_auto]"><div><h2 className="text-4xl font-bold text-primary">{title}</h2><p className="mt-3 text-muted-foreground">{text}</p></div><Button asChild variant="gold" size="xl"><Link to="/contact">Contact Us <ArrowRight /></Link></Button></div></section>;
}
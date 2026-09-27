import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Brain, HandHeart, Heart, Lightbulb, MessageCircleQuestion, Puzzle, School, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import hero from "@/assets/beyond-hero.jpg";
import puzzle from "@/assets/learning-puzzle.jpg";
import reading from "@/assets/learning-reading.jpg";
import workshop from "@/assets/learning-workshop.jpg";
import { Button } from "@/components/ui/button";
import { CtaBand, InfoCard, SectionHeading } from "@/components/page-sections";
import { ImageLightbox, useLightbox } from "@/components/image-lightbox";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Beyond Campaign — We Inspire Learning in Kids" },
    { name: "description", content: "Beyond Campaign inspires children to understand why they learn and discover the joy of lifelong learning." },
    { property: "og:title", content: "Beyond Campaign — We Inspire Learning in Kids" },
    { property: "og:description", content: "Seed the child. Grow the youth. Serve humanity." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: HomePage,
});

const moments: { src: string; label: string }[] = [
  { src: hero, label: "Hands-on discovery" },
  { src: puzzle, label: "Learning through play" },
  { src: workshop, label: "Questions and conversations" },
  { src: reading, label: "Independent exploration" },
];

function HomePage() {
  const { active, open, close, step } = useLightbox(moments);
  return <>
  <section className="relative min-h-[calc(100vh-6rem)] overflow-hidden bg-primary text-primary-foreground">
    <img src={hero} width={1600} height={1008} alt="Children discovering through a hands-on learning activity" className="absolute inset-0 h-full w-full object-cover object-center" />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--primary)_0%,color-mix(in_oklab,var(--primary)_92%,transparent)_37%,color-mix(in_oklab,var(--primary)_25%,transparent)_72%,color-mix(in_oklab,var(--primary)_12%,transparent)_100%)]" />
    <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center px-5 py-20"><div className="max-w-3xl reveal">
      <p className="mb-5 text-xs font-bold uppercase tracking-[.25em] text-gold">We inspire learning in kids</p>
      <h1 className="text-5xl font-bold leading-[.92] sm:text-6xl md:text-7xl lg:text-8xl">Inspiring children to discover the joy of learning.</h1>
      <p className="mt-7 max-w-xl text-base leading-8 text-primary-foreground/85 md:text-lg">Helping every child understand not only what they learn, but why learning matters in life.</p>
      <div className="mt-9 flex flex-wrap gap-3"><Button asChild variant="gold" size="xl"><Link to="/programs">Explore Our Programs <ArrowRight /></Link></Button><Button asChild variant="hero" size="xl"><Link to="/about">About Us</Link></Button></div>
    </div></div>
    <div className="absolute bottom-0 left-0 right-0 border-t border-primary-foreground/20 bg-primary/85 px-5 py-4 backdrop-blur"><p className="mx-auto max-w-7xl text-center font-display text-lg text-gold md:text-2xl">Seed the child — Grow the Youth — Serve Humanity</p></div>
  </section>
  <section className="px-5 pb-4 pt-10 md:pb-5 md:pt-16"><div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
    <div><SectionHeading eyebrow="Our purpose" title="Learning is more than just studying." text="We believe every child has the ability to learn, think, question, understand, and discover. At Beyond Campaign, we create awareness among children about why they learn, what they gain from learning, and how learning can help them in life." /><p className="mt-6 leading-8 text-muted-foreground">We want children to move beyond simply studying for marks and begin to understand the value of learning.</p><blockquote className="mt-8 border-l-2 border-gold pl-6 font-display text-2xl font-semibold text-primary">Education planted in children today becomes a contribution to humanity tomorrow.</blockquote></div>
    <img src={reading} loading="lazy" width={1008} height={768} alt="A child exploring a book in a library" className="aspect-[4/3] w-full object-cover shadow-xl" />
  </div></section>
  <section className="px-5 pb-10 pt-4 md:pb-16 md:pt-5"><div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
    <div className="grid grid-cols-2 gap-4">
      <img src={puzzle} loading="lazy" width={1008} height={768} alt="Children learning through a hands-on puzzle activity" className="aspect-[4/3] w-full object-cover shadow-lg" />
      <img src={workshop} loading="lazy" width={1008} height={768} alt="Children asking questions in a group workshop" className="aspect-[4/3] w-full object-cover shadow-lg lg:mt-8" />
    </div>
    <div><SectionHeading eyebrow="Why it matters" title="When children know why, they learn for life." />
      <div className="mt-8 space-y-6">
        {([[Lightbulb,"Curiosity first","Questions open the door — every session begins with wonder, not answers."],[MessageCircleQuestion,"Confidence to think","Children learn to reason, express, and form their own view with courage."],[HandHeart,"Learning that serves","Knowledge grows into kindness — for family, community, and humanity."]] as const).map(([Icon,t,d]) => (
          <div key={t} className="flex gap-4 border-b border-border pb-6 last:border-0 last:pb-0">
            <div className="flex size-11 shrink-0 items-center justify-center bg-primary text-gold"><Icon /></div>
            <div><h3 className="font-bold text-primary">{t}</h3><p className="mt-1 text-sm leading-7 text-muted-foreground">{d}</p></div>
          </div>
        ))}
      </div>
    </div>
  </div></section>
  <section className="bg-ivory px-5 py-12 md:py-24"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="What we do" title="Experiences that make children think." center /><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{([[School,"Educational awareness programs"],[Sparkles,"Learning activities"],[BookOpen,"School awareness campaigns"],[Users,"Interactive sessions"],[Puzzle,"Games & puzzles for learning"],[Brain,"Workshops for children"],[Heart,"Parent & educator awareness"]] as const).map(([Icon,t]) => <InfoCard key={t} icon={<Icon />} title={t} />)}</div></div></section>
  <section className="px-5 py-12 md:py-28"><div className="mx-auto max-w-7xl"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><SectionHeading eyebrow="A simple journey" title="Ask. Understand. Think. Learn." text="Learning becomes meaningful when a child moves beyond memorising and begins to own the journey." /><div className="grid gap-4 sm:grid-cols-2">{[["01","Ask","Curiosity begins with a question."],["02","Understand","Ideas become clear and connected."],["03","Think","Children reason and form their own view."],["04","Learn","Knowledge becomes a lifelong companion."]].map(([n,t,d]) => <div key={n} className="border border-border p-6"><div className="flex items-center justify-between"><Sparkles className="text-gold-rich"/><span className="text-xs font-bold text-muted-foreground">{n}</span></div><h3 className="mt-8 text-3xl font-bold text-primary">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p></div>)}</div></div></div></section>
  <section className="px-5 py-12 md:py-24"><div className="mx-auto max-w-7xl">
    <div className="flex flex-wrap items-end justify-between gap-6"><SectionHeading eyebrow="Learning moments" title="Joy, curiosity, and discovery in action." /><Button asChild variant="outline" className="border-gold/50 text-primary hover:bg-gold/10"><Link to="/gallery">View Full Gallery <ArrowRight /></Link></Button></div>
    <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {moments.map((m, i) => (
        <figure key={m.label} className="flex flex-col">
          <button
            type="button"
            onClick={() => open(i)}
            aria-label={`View ${m.label}`}
            className="group block w-full cursor-pointer overflow-hidden text-left"
          >
            <img src={m.src} loading="lazy" width={1008} height={768} alt={m.label} className="aspect-[4/3] w-full object-cover shadow-md transition-transform duration-500 group-hover:scale-[1.03]" />
          </button>
          <figcaption className="mt-auto flex min-h-11 items-center bg-primary px-4 py-2.5 text-sm leading-snug text-primary-foreground">{m.label}</figcaption>
        </figure>
      ))}
    </div>
  </div></section>
  <CtaBand />
  {active !== null && (
    <ImageLightbox images={moments} active={active} onClose={close} onStep={step} />
  )}
 </>;
}
import { createFileRoute } from "@tanstack/react-router";
import {
  Brain,
  Compass,
  Globe,
  Heart,
  Lightbulb,
  MessagesSquare,
  Puzzle,
  RefreshCw,
  Sprout,
  Wrench,
} from "lucide-react";
import { CtaBand, InfoCard, PageHero, SectionHeading } from "@/components/page-sections";

const desc =
  "Discover why learning matters beyond marks and exams, from independent thinking to skills for life.";
export const Route = createFileRoute("/why-learning")({
  head: () => ({
    meta: [
      { title: "Why Learning? — Beyond Campaign" },
      { name: "description", content: desc },
      { property: "og:title", content: "Why Learning? — Beyond Campaign" },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const cards = [
    [Globe, "Understand the world", "Learning helps children make sense of life around them."],
    [Wrench, "Develop skills", "Every lesson builds abilities children use every day."],
    [Puzzle, "Solve problems", "Knowledge becomes practical and useful."],
    [Compass, "Make decisions", "Understanding guides better choices in life."],
    [MessagesSquare, "Communicate with others", "Learning helps children share ideas clearly."],
    [Heart, "Discover our interests", "Learning reveals what each child truly enjoys."],
    [RefreshCw, "Adapt to change", "Skills and confidence help children adjust."],
    [Lightbulb, "Create new ideas", "Discovery grows into imagination."],
    [Sprout, "Become more independent", "Children learn to stand on their own."],
  ] as const;
  return (
    <>
      <PageHero
        eyebrow="Why learning?"
        title="Why do I learn?"
        text="This is a simple question, but it can lead to a deeper understanding of education."
      />
      <section className="px-5 py-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="What do we get from learning?" title="Learning can help us…" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cards.map(([Icon, t, d]) => (
              <InfoCard key={t} icon={<Icon />} title={t}>
                {d}
              </InfoCard>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-primary px-5 py-12 text-primary-foreground md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-gold">
            Learning is not only about marks
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">Learning is much broader.</h2>
          <p className="mt-6 leading-8 text-primary-foreground/75">
            Marks can show one part of academic performance, but learning is much broader.
          </p>
          <p className="mt-10 font-display text-3xl font-semibold text-gold md:text-4xl">
            Ask. Understand. Think. Learn.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

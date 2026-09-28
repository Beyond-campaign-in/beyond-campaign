import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen, Brain, Compass, Eye, GraduationCap, HandHeart, HeartHandshake,
  Lightbulb, MessageCircleQuestion, Target, Users,
} from "lucide-react";
import reading from "@/assets/learning-reading.jpg";
import { CtaBand, InfoCard, PageHero, SectionHeading } from "@/components/page-sections";

export const Route = createFileRoute("/vision-mission")({
  head: () => ({ meta: seo("Vision & Mission", "Our vision, mission and values — the principles behind everything we do at Beyond Campaign.") }),
  component: VisionMission,
});

function seo(title: string, description: string) {
  return [
    { title: `${title} — Beyond Campaign` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — Beyond Campaign` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}

function VisionMission() {
  return (
    <>
      <PageHero
        eyebrow="Vision & Mission"
        title="Where we're headed, and why."
        text="The purpose, direction and values behind everything we do at Beyond Campaign."
      />

      <section className="px-5 pb-10 pt-16 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <img
            src={reading}
            loading="lazy"
            width={1008}
            height={768}
            alt="Child reading a book with focus and curiosity"
            className="aspect-[4/3] w-full object-cover"
          />
          <div>
            <SectionHeading
              eyebrow="Our direction"
              title="A clear vision. A bold mission."
            />
            <p className="mt-6 leading-8 text-muted-foreground">
              Everything we do begins with one belief: when children understand why they learn, learning becomes their own.
            </p>
            <p className="mt-4 leading-8 text-muted-foreground">
              Our vision tells us the future we are working towards. Our mission tells us how we will get there — one conversation, one activity, and one curious question at a time.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-12 text-primary-foreground md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2">
            {([
              [Eye, "Our Vision", "To create a generation of children who understand the value of learning, think independently, ask questions, and use knowledge to build a better future."],
              [Target, "Our Mission", "To spark an educational revolution by helping children understand why they learn and inspiring them to become curious, thoughtful, and lifelong learners."],
            ] as const).map(([Icon, t, d]) => (
              <div key={t} className="border border-gold/30 p-8 md:p-10">
                <div className="flex size-12 items-center justify-center bg-gold text-primary"><Icon /></div>
                <h3 className="mt-6 text-2xl font-bold text-gold">{t}</h3>
                <p className="mt-4 leading-8 text-primary-foreground/85">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center leading-8 text-primary-foreground/75">
            We aim to do this through awareness campaigns, interactive activities, conversations, and learning experiences.
          </p>
        </div>
      </section>

      <section className="px-5 py-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our values"
            title="The principles behind everything we do."
            text="Six simple values guide every campaign, activity and conversation we design."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {([
              [MessageCircleQuestion, "Curiosity", "We encourage children to ask questions and explore the world around them."],
              [BookOpen, "Understanding", "We believe understanding is more meaningful than simply memorizing information."],
              [Brain, "Thinking", "We encourage children to think, reason, and form their own understanding."],
              [GraduationCap, "Learning", "Learning is a continuous journey, not something that ends with school."],
              [HandHeart, "Responsibility", "We encourage children to take responsibility for their learning and growth."],
              [HeartHandshake, "Humanity", "We believe knowledge can be used to help ourselves, others, and society."],
            ] as const).map(([Icon, t, d]) => (
              <InfoCard key={t} icon={<Icon />} title={t}>{d}</InfoCard>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory px-5 py-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What this looks like"
            title="Values in action, every day."
            center
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {([
              [Compass, "Ask first", "Every session starts with a question — not an answer. Children share what they think before we share anything."],
              [Lightbulb, "Make it real", "Stories, games and real-life examples turn abstract ideas into something a child can see and touch."],
              [Users, "Grow together", "Teachers, parents and volunteers learn alongside children, because ownership of learning is contagious."],
            ] as const).map(([Icon, t, d]) => (
              <InfoCard key={t} icon={<Icon />} title={t}>{d}</InfoCard>
            ))}
          </div>
          <div className="mt-16 border-y border-border py-10 text-center">
            <Compass className="mx-auto text-gold-rich" />
            <p className="mx-auto mt-4 max-w-2xl font-display text-2xl font-semibold text-primary md:text-3xl">
              A clear vision gives children a reason. A strong mission gives them a path.
            </p>
          </div>
        </div>
      </section>

      <CtaBand title="Be part of the mission." text="Help us bring meaningful learning-awareness experiences to more children." />
    </>
  );
}

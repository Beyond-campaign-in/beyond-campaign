import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen, Brain, Compass, Eye, GraduationCap, HandHeart, Heart, HeartHandshake,
  Lightbulb, MessageCircleQuestion, Target, Users,
} from "lucide-react";
import workshop from "@/assets/learning-workshop.jpg";
import { CtaBand, InfoCard, PageHero, SectionHeading } from "@/components/page-sections";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: seo("About Us", "Beyond Campaign is an educational awareness initiative helping children understand the purpose and value of learning.") }),
  component: About,
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

function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="About Beyond Campaign"
        text="Helping children understand the purpose and value of learning."
      />

      <section className="px-5 pb-10 pt-16 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <img
            src={workshop}
            loading="lazy"
            width={1008}
            height={768}
            alt="Children participating in an interactive learning conversation"
            className="aspect-[4/3] w-full object-cover"
          />
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="An educational awareness initiative."
            />
            <p className="mt-6 leading-8 text-muted-foreground">
              Beyond Campaign is an educational awareness initiative focused on helping children understand the purpose and value of learning.
            </p>
            <p className="mt-4 leading-8 text-muted-foreground">
              We believe education becomes more meaningful when children understand not only what they learn, but also why they learn.
            </p>
            <h3 className="mt-10 text-2xl font-bold text-primary">Why Beyond?</h3>
            <p className="mt-4 leading-8 text-muted-foreground">
              Today, children receive information from many different sources. But information alone is not enough.
            </p>
            <p className="mt-4 leading-8 text-muted-foreground">
              Children need opportunities to understand, think, question, apply, and learn from their experiences.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ivory px-5 py-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          <InfoCard icon={<Lightbulb />} title="Our Approach">
            We use simple conversations, activities, games, questions, stories, and real-life examples to make children think about learning.
          </InfoCard>
          <InfoCard icon={<Heart />} title="Our Belief">
            When children understand why they learn, they can begin to take greater ownership of their learning.
          </InfoCard>
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
            text="We aim to do this through awareness campaigns, interactive activities, conversations, and learning experiences."
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

      <section className="px-5 pb-16 pt-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Who we serve"
            title="Made for school-age children — open to everyone who supports them."
          />
          <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">
            Our activities are designed primarily for school-age children, while also engaging:
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {([
              "Schools",
              "Parents",
              "Teachers",
              "Volunteers",
              "Education supporters",
            ] as const).map((t) => (
              <InfoCard key={t} icon={<Users />} title={t} />
            ))}
          </div>
          <div className="mt-16 border-y border-border py-10 text-center">
            <Compass className="mx-auto text-gold-rich" />
            <p className="mx-auto mt-4 max-w-2xl font-display text-2xl font-semibold text-primary md:text-3xl">
              When children understand why they learn, learning becomes their own.
            </p>
          </div>
        </div>
      </section>

      <CtaBand title="When children know why, learning becomes their own." />
    </>
  );
}

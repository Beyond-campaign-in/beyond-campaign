import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/beyond-hero.jpg";
import puzzle from "@/assets/learning-puzzle.jpg";
import reading from "@/assets/learning-reading.jpg";
import workshop from "@/assets/learning-workshop.jpg";
import { ImageLightbox, useLightbox } from "@/components/image-lightbox";
import { PageHero } from "@/components/page-sections";

const d =
  "A sample gallery illustrating curious children learning through books, questions, games, and collaborative activities.";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Beyond Campaign" },
      { name: "description", content: d },
      { property: "og:title", content: "Gallery — Beyond Campaign" },
      { property: "og:description", content: d },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const imgs: { src: string; label: string }[] = [
  { src: hero, label: "Hands-on discovery" },
  { src: puzzle, label: "Learning through play" },
  { src: workshop, label: "Questions and conversations" },
  { src: reading, label: "Independent exploration" },
  { src: puzzle, label: "Thinking together" },
  { src: hero, label: "Ideas in action" },
];

function Page() {
  const { active, open, close, step } = useLightbox(imgs);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments that represent joyful learning."
        text="These illustrative images show the kind of curiosity, discovery, and participation our learning experiences encourage."
      />
      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {imgs.map((img, i) => (
            <figure key={i}>
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={`View ${img.label}`}
                className="group block w-full cursor-pointer overflow-hidden text-left"
              >
                <img
                  src={img.src}
                  loading="lazy"
                  width={1008}
                  height={768}
                  alt={img.label}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
              <figcaption className="bg-primary px-5 py-3 text-sm text-primary-foreground">
                {img.label}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-7xl border-t border-border pt-6 text-xs text-muted-foreground">
          Note: Images are illustrative samples and do not represent completed Beyond Campaign events.
        </p>
      </section>

      {active !== null && (
        <ImageLightbox images={imgs} active={active} onClose={close} onStep={step} />
      )}
    </>
  );
}

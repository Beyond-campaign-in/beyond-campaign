import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import hero from "@/assets/beyond-hero.jpg";
import puzzle from "@/assets/learning-puzzle.jpg";
import reading from "@/assets/learning-reading.jpg";
import workshop from "@/assets/learning-workshop.jpg";
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
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((i) => (i === null ? i : (i + dir + imgs.length) % imgs.length)),
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

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
            <figure key={i} className={i === 0 ? "sm:col-span-2" : ""}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View ${img.label}`}
                className="group block w-full cursor-pointer overflow-hidden text-left"
              >
                <img
                  src={img.src}
                  loading="lazy"
                  width={i === 0 ? 1600 : 1008}
                  height={i === 0 ? 1008 : 768}
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
        <div
          role="dialog"
          aria-modal="true"
          aria-label={imgs[active]!.label}
          className="nav-fade fixed inset-0 z-[60] flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition-transform hover:scale-105"
          >
            <X className="size-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition-transform hover:scale-105 md:left-6"
          >
            <ChevronLeft className="size-6" />
          </button>
          <figure
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imgs[active]!.src}
              alt={imgs[active]!.label}
              className="max-h-[75vh] w-full object-contain shadow-2xl"
            />
            <figcaption className="flex items-center justify-between bg-primary px-5 py-3 text-sm text-primary-foreground">
              <span>{imgs[active]!.label}</span>
              <span className="text-primary-foreground/70">
                {active + 1} / {imgs.length}
              </span>
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition-transform hover:scale-105 md:right-6"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </>
  );
}

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export interface LightboxImage {
  src: string;
  label: string;
}

/** Shared lightbox state: active index, open/close, prev/next with wrap-around. */
export function useLightbox(images: LightboxImage[]) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((i) =>
        i === null ? i : (i + dir + images.length) % images.length,
      ),
    [images.length],
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

  return { active, open: setActive, close, step };
}

export function ImageLightbox({
  images,
  active,
  onClose,
  onStep,
}: {
  images: LightboxImage[];
  active: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={images[active]!.label}
      className="nav-fade fixed inset-0 z-[60] flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition-transform hover:scale-105"
      >
        <X className="size-5" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onStep(-1);
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
          src={images[active]!.src}
          alt={images[active]!.label}
          className="max-h-[75vh] w-full object-contain shadow-2xl"
        />
        <figcaption className="flex items-center justify-between bg-primary px-5 py-3 text-sm text-primary-foreground">
          <span>{images[active]!.label}</span>
          <span className="text-primary-foreground/70">
            {active + 1} / {images.length}
          </span>
        </figcaption>
      </figure>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onStep(1);
        }}
        aria-label="Next image"
        className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition-transform hover:scale-105 md:right-6"
      >
        <ChevronRight className="size-6" />
      </button>
    </div>
  );
}

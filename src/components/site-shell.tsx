import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/beyond-campaign-logo-transparent.png";
import { Button } from "@/components/ui/button";

const links = [
  ["Home", "/"], ["About", "/about"], ["Vision & Mission", "/vision-mission"], ["Why Learning?", "/why-learning"],
  ["Programs", "/programs"], ["Events", "/events"], ["Gallery", "/gallery"],
  ["Get Involved", "/get-involved"], ["FAQ", "/faq"], ["Contact", "/contact"],
] as const;

type Path = (typeof links)[number][1];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return <>
    <header className={`sticky top-0 z-50 border-b-2 border-gold bg-background/95 backdrop-blur-xl transition-all duration-300 ${scrolled ? "shadow-[0_12px_35px_-20px_oklch(0.31_0.13_20/0.65)]" : ""}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 transition-all duration-300 ${scrolled ? "h-[4.5rem] lg:h-20" : "h-20 lg:h-24"}`}>
        <Link to="/" className="flex min-w-0 shrink-0 items-center" aria-label="Beyond Campaign home">
          <img src={logo} alt="Beyond Campaign" className={`w-auto shrink-0 object-contain object-left transition-all duration-300 ${scrolled ? "h-16 lg:h-[4.5rem]" : "h-[4.5rem] lg:h-[5.5rem]"}`} />
          <span className="sr-only">Beyond Campaign</span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Main navigation">
          {links.map(([label, to]) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="nav-link whitespace-nowrap text-[13px] font-bold text-foreground/70 hover:text-primary"
            >{label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden border border-gold/40 bg-primary text-primary-foreground shadow-md transition-all hover:-translate-y-0.5 hover:bg-burgundy-soft hover:shadow-lg md:inline-flex">
            <Link to="/get-involved">Get Involved <ArrowRight className="size-4" /></Link>
          </Button>
          <Button variant="ghost" size="icon" className="xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && <>
        <button aria-hidden tabIndex={-1} onClick={() => setOpen(false)} className="nav-fade absolute inset-x-0 top-full h-screen cursor-default bg-foreground/30 backdrop-blur-sm xl:hidden" />
        <nav className="nav-drop border-t border-border bg-background px-5 py-4 shadow-xl xl:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-7xl gap-1">
            {links.map(([label, to]) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: to === "/" }}
                onClick={() => setOpen(false)}
                className="mobile-nav-link flex items-center justify-between rounded-md px-3 py-3 text-sm font-semibold hover:bg-secondary"
              >
                {label}
                <ArrowRight className="size-4 opacity-40" />
              </Link>
            ))}
            <div className="mt-3 grid gap-2 border-t border-border pt-4 text-sm">
              <a className="flex items-center gap-2 text-muted-foreground" href="tel:+917708045679"><Phone className="size-4" />+91 77080 45679</a>
              <a className="flex items-center gap-2 break-all text-muted-foreground" href="mailto:beyondcampaign.in@gmail.com"><Mail className="size-4" />beyondcampaign.in@gmail.com</a>
            </div>
          </div>
        </nav>
      </>}
    </header>
  </>;
}

export function PageFlowNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const index = links.findIndex(([, to]) => to === pathname);
  if (index === -1) return null;
  const prev = index > 0 ? links[index - 1] : null;
  const next = index < links.length - 1 ? links[index + 1] : null;
  if (!prev && !next) return null;

  return (
    <nav aria-label="Page navigation" className="border-t border-border bg-ivory">
      <div className="mx-auto grid max-w-7xl gap-4 px-5 py-10 sm:grid-cols-2">
        {prev ? <FlowCard dir="prev" label={prev[0]} to={prev[1]} /> : <span className="hidden sm:block" />}
        {next && <FlowCard dir="next" label={next[0]} to={next[1]} />}
      </div>
    </nav>
  );
}

function FlowCard({ dir, label, to }: { dir: "prev" | "next"; label: string; to: Path }) {
  const isNext = dir === "next";
  return (
    <Link
      to={to}
      className={`group flex items-center gap-4 rounded-lg border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_18px_40px_-28px_oklch(0.31_0.13_20/0.7)] ${isNext ? "sm:flex-row-reverse sm:text-right" : ""}`}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {isNext ? <ArrowRight className="size-4" /> : <ArrowLeft className="size-4" />}
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{isNext ? "Next page" : "Previous page"}</span>
        <span className="mt-1 block truncate font-display text-xl text-primary">{label}</span>
      </span>
    </Link>
  );
}

export function SiteFooter() {
  return <footer className="bg-primary text-primary-foreground">
    <div className="h-px gold-rule" />
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <div className="inline-flex rounded-md bg-background px-4 py-3 shadow-sm">
          <img src={logo} alt="Beyond Campaign" className="h-24 w-auto object-contain object-left" />
        </div>
        <p className="mt-4 max-w-sm text-sm leading-7 text-primary-foreground/75">Inspiring children to ask, understand, think, and discover the lifelong value of learning.</p>
      </div>
        <div>
          <h2 className="text-xl text-gold">Explore</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {links.map(([label, to]) => (
            <Link key={to} to={to} className="w-fit text-primary-foreground/75 transition-all duration-200 hover:translate-x-1 hover:text-gold">{label}</Link>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl text-gold">Connect</h2>
        <div className="mt-4 space-y-3 text-sm text-primary-foreground/75">
          <a className="block transition-colors hover:text-gold" href="tel:+917708045679">+91 77080 45679</a>
          <a className="block break-all transition-colors hover:text-gold" href="mailto:beyondcampaign.in@gmail.com">beyondcampaign.in@gmail.com</a>
          <a className="block transition-colors hover:text-gold" href="https://www.beyondcampaign.co.in">www.beyondcampaign.co.in</a>
        </div>
      </div>
    </div>
    <div className="border-t border-primary-foreground/15 px-5 py-5 text-center text-xs text-primary-foreground/55">© {new Date().getFullYear()} Beyond Campaign. All Rights Reserved.</div>
  </footer>;
}

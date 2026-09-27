import { Link } from "@tanstack/react-router";
import { Mail, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/beyond-campaign-logo.png.asset.json";
import { Button } from "@/components/ui/button";

const links = [
  ["Home", "/"], ["About", "/about"], ["Why Learning?", "/why-learning"],
  ["Programs", "/programs"], ["Events", "/events"], ["Gallery", "/gallery"],
  ["Get Involved", "/get-involved"], ["FAQ", "/faq"], ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <>
    <div className="hidden bg-primary px-5 py-2 text-primary-foreground md:block">
      <div className="mx-auto flex max-w-7xl justify-end gap-6 text-xs">
        <a className="flex items-center gap-2 hover:text-gold" href="tel:+917708045679"><Phone className="size-3.5" />+91 77080 45679</a>
        <a className="flex items-center gap-2 hover:text-gold" href="mailto:beyondcampaign.in@gmail.com"><Mail className="size-3.5" />beyondcampaign.in@gmail.com</a>
      </div>
    </div>
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:h-24">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo.url} alt="Beyond Campaign" className="h-16 w-24 shrink-0 object-contain object-left lg:h-20 lg:w-32" />
          <span className="sr-only">Beyond Campaign</span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
          {links.map(([label, to]) => <Link key={to} to={to} activeOptions={{ exact: to === "/" }} className="whitespace-nowrap text-[13px] font-semibold text-foreground/75 transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>{label}</Link>)}
        </nav>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav className="border-t border-border bg-background px-5 py-4 lg:hidden" aria-label="Mobile navigation">
        <div className="mx-auto grid max-w-7xl gap-1">{links.map(([label,to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-semibold hover:bg-secondary" activeProps={{ className: "bg-secondary text-primary" }}>{label}</Link>)}</div>
      </nav>}
    </header>
  </>;
}

export function SiteFooter() {
  return <footer className="bg-primary text-primary-foreground">
    <div className="h-px gold-rule" />
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
      <div><img src={logo.url} alt="Beyond Campaign" className="h-28 w-44 rounded-sm bg-background object-contain p-2" /><p className="mt-4 max-w-sm text-sm leading-7 text-primary-foreground/75">Inspiring children to ask, understand, think, and discover the lifelong value of learning.</p></div>
      <div><h2 className="text-xl text-gold">Explore</h2><div className="mt-4 grid grid-cols-2 gap-3 text-sm">{links.slice(1,9).map(([label,to]) => <Link key={to} to={to} className="text-primary-foreground/75 hover:text-gold">{label}</Link>)}</div></div>
      <div><h2 className="text-xl text-gold">Connect</h2><div className="mt-4 space-y-3 text-sm text-primary-foreground/75"><a className="block hover:text-gold" href="tel:+917708045679">+91 77080 45679</a><a className="block break-all hover:text-gold" href="mailto:beyondcampaign.in@gmail.com">beyondcampaign.in@gmail.com</a><a className="block hover:text-gold" href="https://www.beyondcampaign.co.in">www.beyondcampaign.co.in</a></div></div>
    </div>
    <div className="border-t border-primary-foreground/15 px-5 py-5 text-center text-xs text-primary-foreground/55">© {new Date().getFullYear()} Beyond Campaign. All Rights Reserved.</div>
  </footer>;
}
 import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, type FormEvent } from "react";
import { Globe2, Mail, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-sections";

const description =
  "Contact Beyond Campaign about school awareness programs, volunteering, partnerships, or educational collaboration.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Beyond Campaign" },
      { name: "description", content: description },
      { property: "og:title", content: "Contact Us — Beyond Campaign" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [autoReplyError, setAutoReplyError] = useState("");
  
  // Guard reference to prevent double submission
  const isSubmittingRef = useRef(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmittingRef.current || loading) return;
    isSubmittingRef.current = true;

    setDone(false);
    setError("");
    setAutoReplyError("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      organization: String(
        formData.get("organization") ?? ""
      ).trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const serviceId = import.meta.env["VITE_EMAILJS_SERVICE_ID"];
      const contactTemplateId =
        import.meta.env["VITE_EMAILJS_TEMPLATE_ID"];
      const autoReplyTemplateId =
        import.meta.env["VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID"];
      const publicKey = import.meta.env["VITE_EMAILJS_PUBLIC_KEY"];

      if (
        !serviceId ||
        !contactTemplateId ||
        !autoReplyTemplateId ||
        !publicKey
      ) {
        throw new Error(
          "EmailJS configuration missing. Check your .env file."
        );
      }

      // 1. Send contact enquiry to Beyond Campaign.
      await emailjs.send(
        serviceId,
        contactTemplateId,
        {
          name: payload.name,
          from_name: payload.name,
          from_email: payload.email,
          email: payload.email,
          reply_to: payload.email,
          title: "Contact Us",
          phone: payload.phone || "Not provided",
          organization: payload.organization || "Not provided",
          message: payload.message,
          to_email: "beyondcampaign.in@gmail.com",
        },
        { publicKey }
      );

      console.log("Contact email sent successfully.");

      // The enquiry has been received.
      setDone(true);
      form.reset();

      // 2. Send confirmation email to the visitor.
      try {
        const autoReplyResponse = await emailjs.send(
          serviceId,
          autoReplyTemplateId,
          {
            name: payload.name,
            to_name: payload.name,
            email: payload.email,
            to_email: payload.email,
            from_name: "Beyond Campaign",
            reply_to: "beyondcampaign.in@gmail.com",
            title: "Contact Us",
            phone: payload.phone || "Not provided",
            organization: payload.organization || "Not provided",
            message: payload.message,
          },
          { publicKey }
        );

        console.log(
          "Auto-reply sent successfully:",
          autoReplyResponse.status,
          autoReplyResponse.text
        );
      } catch (autoReplyError: unknown) {
        console.error("Auto-reply failed:", autoReplyError);

        if (
          autoReplyError &&
          typeof autoReplyError === "object"
        ) {
          const emailError = autoReplyError as {
            status?: number;
            text?: string;
            message?: string;
          };

          console.error("EmailJS status:", emailError.status);
          console.error("EmailJS response:", emailError.text);
          console.error("Error message:", emailError.message);
        }

        setAutoReplyError(
          "Your enquiry was received, but the confirmation email could not be sent. Please check the Auto-Reply template settings."
        );
      }
    } catch (err: unknown) {
      console.error("Contact email failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to send your enquiry. Please try again."
      );
    } finally {
      setLoading(false);
      isSubmittingRef.current = false;
    }
  }

  const field =
    "mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-gold-rich focus:ring-2 focus:ring-gold/20";

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let’s connect."
        text="Have a question? Want to conduct a program, volunteer, partner, or support our work? We would love to hear from you."
      />

      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <h2 className="text-4xl font-bold text-primary">
              Beyond Campaign
            </h2>

            <p className="mt-3 font-display text-xl italic text-gold-rich">
              “We inspire learning in kids”
            </p>

            <div className="mt-10 space-y-5">
              <a
                href="tel:+917708045679"
                className="flex items-center gap-4 border-b border-border pb-5"
              >
                <Phone className="text-gold-rich" />
                <span>
                  <small className="block text-muted-foreground">
                    Phone
                  </small>
                  +91 77080 45679
                </span>
              </a>

              <a
                href="mailto:beyondcampaign.in@gmail.com"
                className="flex items-center gap-4 border-b border-border pb-5"
              >
                <Mail className="text-gold-rich" />
                <span className="min-w-0 break-all">
                  <small className="block text-muted-foreground">
                    Email
                  </small>
                  beyondcampaign.in@gmail.com
                </span>
              </a>

              <a
                href="https://www.beyondcampaign.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4"
              >
                <Globe2 className="text-gold-rich" />
                <span>
                  <small className="block text-muted-foreground">
                    Website
                  </small>
                  www.beyondcampaign.co.in
                </span>
              </a>
            </div>
          </div>

          <form
            onSubmit={submit}
            className="bg-ivory p-6 shadow-sm md:p-10"
          >
            <h2 className="text-3xl font-bold text-primary">
              Send an enquiry
            </h2>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold">
                Name *
                <input
                  className={field}
                  name="name"
                  autoComplete="name"
                  required
                />
              </label>

              <label className="text-sm font-semibold">
                Email *
                <input
                  className={field}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="text-sm font-semibold">
                Phone
                <input
                  className={field}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={20}
                />
              </label>

              <label className="text-sm font-semibold">
                School / Organization
                <input
                  className={field}
                  name="organization"
                  autoComplete="organization"
                />
              </label>

              <label className="text-sm font-semibold sm:col-span-2">
                Message *
                <textarea
                  className={`${field} min-h-36 resize-y`}
                  name="message"
                  required
                />
              </label>
            </div>

            <Button
              type="submit"
              variant="gold"
              size="xl"
              className="mt-6"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>

            {done && (
              <p
                role="status"
                className="mt-4 rounded-md border border-gold bg-background p-4 text-sm text-primary"
              >
                Thank you! Your enquiry has been sent successfully.
              </p>
            )}

            {error && (
              <p
                role="alert"
                className="mt-4 rounded-md border border-red-500 bg-background p-4 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {autoReplyError && (
              <p
                role="alert"
                className="mt-4 rounded-md border border-red-500 bg-background p-4 text-sm text-red-600"
              >
                {autoReplyError}
              </p>
            )}

            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              Your contact details will be used to respond to your enquiry.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
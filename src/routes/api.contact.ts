
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();

          const name = String(body.name ?? "").trim();
          const email = String(body.email ?? "").trim();
          const phone = String(body.phone ?? "").trim();
          const organization = String(
            body.organization ?? ""
          ).trim();
          const message = String(body.message ?? "").trim();

          // Validate required fields
          if (!name || !email || !message) {
            return Response.json(
              {
                success: false,
                message: "Please fill in all required fields.",
              },
              { status: 400 }
            );
          }

          // Validate email
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return Response.json(
              {
                success: false,
                message: "Please enter a valid email address.",
              },
              { status: 400 }
            );
          }

          // Get Resend API key from .env
          const apiKey = process.env["RESEND_API_KEY"];

          if (!apiKey) {
            return Response.json(
              {
                success: false,
                message: "Email service is not configured.",
              },
              { status: 500 }
            );
          }

          const from =
            "Beyond Campaign <onboarding@resend.dev>";

          // Email 1: Send enquiry details to the client
          const clientResponse = await fetch(
            "https://api.resend.com/emails",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                from,
                to: ["pg3259060@gmail.com"],
                reply_to: email,
                subject: `New enquiry from ${name}`,
                text: [
                  "You have received a new enquiry through your website.",
                  "",
                  `Name: ${name}`,
                  `Email: ${email}`,
                  `Phone: ${phone || "Not provided"}`,
                  `School / Organization: ${
                    organization || "Not provided"
                  }`,
                  "",
                  "Message:",
                  message,
                ].join("\n"),
              }),
            }
          );

          if (!clientResponse.ok) {
            console.error(
              "Client notification error:",
              await clientResponse.text()
            );

            return Response.json(
              {
                success: false,
                message:
                  "Unable to send your enquiry. Please try again later.",
              },
              { status: 502 }
            );
          }

          // Email 2: Send automatic confirmation to the visitor
          const visitorResponse = await fetch(
            "https://api.resend.com/emails",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                from,
                to: [email],
                subject:
                  "Thank you for contacting Beyond Campaign",
                text: [
                  `Dear ${name},`,
                  "",
                  "Thank you for your enquiry and for your interest in Beyond Campaign.",
                  "We have received your message successfully.",
                  "Our team will contact you within 24 hours.",
                  "",
                  "Best regards,",
                  "Beyond Campaign Team",
                ].join("\n"),
              }),
            }
          );

          if (!visitorResponse.ok) {
            console.error(
              "Visitor confirmation error:",
              await visitorResponse.text()
            );

            return Response.json(
              {
                success: false,
                message:
                  "Your enquiry was received, but the confirmation email could not be sent.",
              },
              { status: 502 }
            );
          }

          return Response.json({
            success: true,
            message:
              "Your enquiry has been sent successfully. A confirmation email has been sent to your email address.",
          });
        } catch (error) {
          console.error("Contact API error:", error);

          return Response.json(
            {
              success: false,
              message: "Something went wrong. Please try again.",
            },
            { status: 500 }
          );
        }
      },
    },
  },
});

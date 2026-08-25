import { Resend } from "resend";
import {
  annualVolumeLabels,
  productCategoryLabels,
  sustainabilityLabels,
  type ContactFormValues,
} from "@/lib/contact/schema";
import { siteUrl } from "@/lib/seo/config";

const DEFAULT_RECIPIENT = "usama@jaguarpvt.com";

type ContactSubmissionMeta = {
  submittedAt: string;
  source: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatWebsite(value?: string) {
  if (!value) return "Not provided";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

function buildMatcherSection(data: ContactFormValues) {
  const hasMatcherContext =
    data.matchSummary || data.matcherVolume || data.matcherMaterials || data.matcherRegion;

  if (!hasMatcherContext) {
    return null;
  }

  return {
    text: [
      "",
      "Capability matcher context",
      "-------------------------",
      data.matchSummary ? `Summary: ${data.matchSummary}` : null,
      data.matcherVolume ? `Matcher volume: ${data.matcherVolume}` : null,
      data.matcherMaterials ? `Matcher materials: ${data.matcherMaterials}` : null,
      data.matcherRegion ? `Matcher region: ${data.matcherRegion}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
    html: `
      <h2 style="margin:24px 0 12px;font-size:16px;color:#161513;">Capability matcher context</h2>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
        ${data.matchSummary ? row("Summary", data.matchSummary) : ""}
        ${data.matcherVolume ? row("Matcher volume", data.matcherVolume) : ""}
        ${data.matcherMaterials ? row("Matcher materials", data.matcherMaterials) : ""}
        ${data.matcherRegion ? row("Matcher region", data.matcherRegion) : ""}
      </table>
    `,
  };
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 12px;border:1px solid #c7b4a2;background:#fafaf9;width:180px;font-size:13px;color:#4a4b4e;vertical-align:top;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 12px;border:1px solid #c7b4a2;font-size:14px;color:#161513;vertical-align:top;">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

function buildPlainTextEmail(data: ContactFormValues, meta: ContactSubmissionMeta) {
  const sustainability =
    data.sustainability.length > 0
      ? data.sustainability.map((value) => sustainabilityLabels[value]).join(", ")
      : "None specified";

  const matcher = buildMatcherSection(data);

  return [
    "New Jaguar website contact inquiry",
    "=================================",
    "",
    "Contact details",
    "---------------",
    `Company: ${data.companyName}`,
    `Contact name: ${data.contactName}`,
    `Email: ${data.email}`,
    `Website: ${formatWebsite(data.website)}`,
    "",
    "Program details",
    "---------------",
    `Product category: ${productCategoryLabels[data.category]}`,
    `Estimated annual volume: ${annualVolumeLabels[data.annualVolume]}`,
    `Sustainability requirements: ${sustainability}`,
    "",
    "Message",
    "-------",
    data.message,
    matcher?.text ?? "",
    "",
    "Submission metadata",
    "-------------------",
    `Submitted at: ${meta.submittedAt}`,
    `Source: ${meta.source}`,
    "",
    "Reply directly to this email to respond to the sender.",
  ].join("\n");
}

function buildHtmlEmail(data: ContactFormValues, meta: ContactSubmissionMeta) {
  const sustainability =
    data.sustainability.length > 0
      ? data.sustainability.map((value) => sustainabilityLabels[value]).join(", ")
      : "None specified";

  const matcher = buildMatcherSection(data);

  return `
    <!DOCTYPE html>
    <html lang="en">
      <body style="margin:0;padding:24px;background:#f7f4ef;font-family:Inter,Arial,sans-serif;color:#161513;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;background:#fbfaf7;border:1px solid #c7b4a2;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:24px;background:#0a0a0a;color:#f5f3f0;">
              <img src="${siteUrl}/logos/jaguar-mark.png" alt="Jaguar" width="40" height="64" style="display:block;height:56px;width:auto;margin:0 0 12px;" />
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#c7b4a2;">Jaguar Website</p>
              <h1 style="margin:0;font-size:24px;line-height:1.3;">New contact inquiry</h1>
              <p style="margin:12px 0 0;font-size:14px;color:rgba(255,255,255,0.78);">${escapeHtml(data.companyName)} submitted the contact form.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <h2 style="margin:0 0 12px;font-size:16px;color:#161513;">Contact details</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                ${row("Company", data.companyName)}
                ${row("Contact name", data.contactName)}
                ${row("Email", data.email)}
                ${row("Website", formatWebsite(data.website))}
              </table>

              <h2 style="margin:24px 0 12px;font-size:16px;color:#161513;">Program details</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                ${row("Product category", productCategoryLabels[data.category])}
                ${row("Estimated annual volume", annualVolumeLabels[data.annualVolume])}
                ${row("Sustainability requirements", sustainability)}
              </table>

              <h2 style="margin:24px 0 12px;font-size:16px;color:#161513;">Message</h2>
              <div style="padding:16px;border:1px solid #c7b4a2;border-radius:12px;background:#fafaf9;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</div>

              ${matcher?.html ?? ""}

              <h2 style="margin:24px 0 12px;font-size:16px;color:#161513;">Submission metadata</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                ${row("Submitted at", meta.submittedAt)}
                ${row("Source", meta.source)}
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export async function sendContactSubmissionEmail(
  data: ContactFormValues,
  meta: ContactSubmissionMeta,
) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_FORM_TO ?? DEFAULT_RECIPIENT;
  const from =
    process.env.CONTACT_FORM_FROM ?? "Jaguar Website <notifications@jaguarpvt.com>";

  const metaPayload = { submittedAt: meta.submittedAt, source: meta.source };
  const subject = `New contact inquiry — ${data.companyName}`;

  const result = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject,
    text: buildPlainTextEmail(data, metaPayload),
    html: buildHtmlEmail(data, metaPayload),
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}

export const contactFormRecipient = DEFAULT_RECIPIENT;

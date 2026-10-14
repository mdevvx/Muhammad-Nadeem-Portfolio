import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { niches, profile, reviews } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Share card shown when the site link is posted on Discord, LinkedIn, X, Slack, etc.
export default async function OpengraphImage() {
  const [photo, display] = await Promise.all([
    fs.readFile(path.join(process.cwd(), "public", "avatar.jpg")),
    // Satori can't read woff2, so the share card uses a TTF of the heading font.
    fs.readFile(path.join(process.cwd(), "src", "fonts", "BricolageGrotesque-ExtraBold.ttf")),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  const lime = "#bef264";
  const orange = "#fb923c";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#09090b",
          backgroundImage: `radial-gradient(circle at 92% 8%, rgba(163,230,53,0.28), transparent 45%), radial-gradient(circle at 70% 110%, rgba(251,146,60,0.22), transparent 45%)`,
          color: "#f4f4f0",
          fontFamily: "sans-serif",
          padding: "64px 72px",
        }}
      >
        {/* left column */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                alignSelf: "flex-start",
                border: "1px solid rgba(190,242,100,0.4)",
                borderRadius: 999,
                padding: "8px 18px",
                fontSize: 22,
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: lime }} />
              Open for new projects
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 30,
                fontFamily: "Bricolage",
                fontSize: 68,
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: -2,
              }}
            >
              <span>A Discord your members</span>
              <span
                style={{
                  backgroundImage: `linear-gradient(90deg, ${lime}, ${orange})`,
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                actually stay in
              </span>
            </div>

            <div style={{ display: "flex", marginTop: 22, fontSize: 26, color: "#a1a1aa", maxWidth: 620, lineHeight: 1.35 }}>
              Community management, custom bots and server security for{" "}
              {niches.join(", ").toLowerCase().replace("ai", "AI").replace("web3", "Web3").replace(/, ([^,]*)$/, " and $1")} brands.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: 44, fontSize: 22, color: "#a1a1aa" }}>
            <Stat value="30+" label="bots built" />
            <Stat value="5.0" star label={`${reviews.length} Upwork reviews`} />
            <Stat value="5+ yrs" label="on Discord" />
          </div>
        </div>

        {/* right column: portrait card */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginLeft: 48 }}>
          <div
            style={{
              display: "flex",
              padding: 6,
              borderRadius: 40,
              backgroundImage: `linear-gradient(135deg, ${lime}, ${orange})`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photoSrc} width={330} height={330} style={{ borderRadius: 34, objectFit: "cover" }} alt="" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 22 }}>
            <span style={{ fontFamily: "Bricolage", fontSize: 34, fontWeight: 800 }}>{profile.name}</span>
            <span style={{ fontSize: 22, color: "#a1a1aa", marginTop: 4 }}>{profile.role}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Bricolage", data: display, weight: 800, style: "normal" }],
    },
  );
}

function Stat({ value, label, star }: { value: string; label: string; star?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "Bricolage", fontSize: 42, fontWeight: 800, color: "#f4f4f0" }}>{value}</span>
        {star && (
          <svg width="32" height="32" viewBox="0 0 24 24">
            <path
              fill="#fb923c"
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        )}
      </div>
      <span>{label}</span>
    </div>
  );
}

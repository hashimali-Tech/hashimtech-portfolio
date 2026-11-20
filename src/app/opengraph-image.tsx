import { ImageResponse } from "next/og";
import { profile } from "@/data/content";

export const alt = `${profile.name} — ${profile.headline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#070B18",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(76, 141, 255, 0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              padding: "10px 20px",
              background: "#0E1530",
              border: "1px solid rgba(76, 141, 255, 0.4)",
              borderRadius: 999,
              color: "#7DD3FC",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {profile.brand}
          </div>
          <span style={{ color: "#9AA7C7", fontSize: 20 }}>{profile.location}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h1
            style={{
              fontSize: 60,
              fontWeight: 800,
              color: "#E8EEFF",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {profile.name}
          </h1>
          <p
            style={{
              fontSize: 32,
              color: "#9AA7C7",
              lineHeight: 1.3,
              margin: 0,
              maxWidth: 900,
            }}
          >
            {profile.headline}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 24,
            color: "#4C8DFF",
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          <span>React</span>
          <span>•</span>
          <span>Node.js</span>
          <span>•</span>
          <span>Express</span>
          <span>•</span>
          <span>MongoDB</span>
          <span>•</span>
          <span>AI Integration</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

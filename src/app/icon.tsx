import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: "#0E1530",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#7DD3FC",
          fontWeight: 700,
          borderRadius: 8,
          border: "1px solid rgba(76, 141, 255, 0.4)",
        }}
      >
        HT
      </div>
    ),
    {
      ...size,
    }
  );
}

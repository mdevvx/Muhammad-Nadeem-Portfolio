import { ImageResponse } from "next/og";
import { paletteHex } from "@/lib/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: paletteHex.accent,
          borderRadius: 16,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 64 64">
          <path d="M12 48V16l20 22 20-22v32" fill="none" stroke={paletteHex.onAccent} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    size,
  );
}

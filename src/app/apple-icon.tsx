import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { paletteHex } from "@/lib/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const photo = `data:image/jpeg;base64,${fs.readFileSync(path.join(process.cwd(), "src/app/avatar-icon.jpg")).toString("base64")}`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: paletteHex.accent }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} width={150} height={150} alt="" style={{ width: 150, height: 150, borderRadius: 32, objectFit: "cover" }} />
      </div>
    ),
    size,
  );
}

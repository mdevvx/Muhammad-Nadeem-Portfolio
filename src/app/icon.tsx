import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { paletteHex } from "@/lib/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Face crop of the profile photo (see avatar-icon.jpg) inside the rounded accent tile.
const photo = `data:image/jpeg;base64,${fs.readFileSync(path.join(process.cwd(), "src/app/avatar-icon.jpg")).toString("base64")}`;

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} width={54} height={54} alt="" style={{ width: 54, height: 54, borderRadius: 12, objectFit: "cover" }} />
      </div>
    ),
    size,
  );
}

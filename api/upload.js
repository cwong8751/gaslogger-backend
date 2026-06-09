import { put } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { filename, file } = req.body;

    if (!file) {
      return res.status(400).json({ error: "Missing file" });
    }

    // FIX: convert base64 → buffer
    const buffer = Buffer.from(file, "base64");

    const blob = await put(filename || "upload.jpg", buffer, {
      access: "private" // or "public"
    });

    return res.status(200).json({
      url: blob.url
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Upload failed" });
  }
}
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

    // file should be base64 or buffer depending on your frontend setup
    const blob = await put(filename || "upload.jpg", file, {
      access: "public",
    });

    return res.status(200).json({
      url: blob.url,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Upload failed" });
  }
}
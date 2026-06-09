// upload.js
// Vends the Vercel Blob write token so the iOS client can PUT images
// directly to Vercel Blob without routing the binary payload through this server.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return res.status(500).json({ error: "Blob token not configured on server" });
  }

  return res.status(200).json({ token });
}

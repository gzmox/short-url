import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { url } = req.body;

      if (!url || !url.startsWith("http")) {
        return res.status(400).json({ error: "Invalid URL" });
      }

      const code = Math.random().toString(36).substring(2, 8);
      await kv.set(code, url);

      return res.status(200).json({
        shortUrl: `${req.headers.origin}/${code}`,
      });
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

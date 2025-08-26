import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const { code } = req.query;
  const longUrl = await kv.get(code);

  if (longUrl) {
    res.writeHead(302, { Location: longUrl });
    res.end();
  } else {
    res.status(404).send("URL not found");
  }
}

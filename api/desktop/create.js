import pkg from '@e2b/desktop';
const { Desktop } = pkg;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    const desktop = await Desktop.create({
      template: 'vnc', // or another template name
    });

    return res.status(200).json({
      sandboxId: desktop.sandbox.id,
      streamUrl: desktop.streamUrl,
    });
  } catch (err) {
    console.error(err); // this shows up in Vercel logs
    return res.status(500).json({ error: 'Failed to create desktop' });
  }
}

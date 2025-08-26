import * as pkg from '@e2b/desktop';
const { Desktop } = pkg;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    console.log('Creating desktop...');
    const desktop = await Desktop.create({ template: 'vnc' });

    return res.status(200).json({
      sandboxId: desktop.sandbox.id,
      streamUrl: desktop.streamUrl,
    });
  } catch (err) {
    console.error('Error creating desktop:', err);
    return res.status(500).json({ error: 'Failed to create desktop' });
  }
}

import pkg from '@e2b/desktop';
const { Desktop } = pkg;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    console.log('Received POST request - creating desktop...');
    
    const desktop = await Desktop.create({
      template: 'vnc', // or another template name
    });

    console.log('Desktop created successfully:', desktop);

    return res.status(200).json({
      sandboxId: desktop.sandbox.id,
      streamUrl: desktop.streamUrl,
    });
  } catch (err) {
    console.error('Failed to create desktop:', err);

    // Return error details only in development to avoid leaking info in production
    const errorResponse = process.env.NODE_ENV === 'development'
      ? { error: 'Failed to create desktop', details: err.message }
      : { error: 'Failed to create desktop' };

    return res.status(500).json(errorResponse);
  }
}

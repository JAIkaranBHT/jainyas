import { DesktopSandbox } from "@e2b/desktop";

export default async function handler(req, res) {
  try {
    const sandbox = await DesktopSandbox.create({
      template: "@e2b/ubuntu-desktop"
    });
    const stream = await sandbox.stream.start();
    const url = stream.getUrl();

    res.status(200).json({
      sandboxId: sandbox.id,
      streamUrl: url
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create desktop sandbox" });
  }
}

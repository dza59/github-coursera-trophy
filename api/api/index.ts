import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { fetchCertification, setDefaultHeaders } from './helper';
import { certificationSVG } from './svgTemplates';
import cors from 'cors';
import { Certification } from './interfaces';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use(setDefaultHeaders);

app.get('/certifications', async (req: Request, res: Response) => {
  const credentialIDs = req.query.ids
    ? req.query.ids.toString().split(',')
    : [];

  if (credentialIDs.length === 0) {
    return res.status(400).send('Invalid or missing "ids" query parameter.');
  }
  const fetchTasks = credentialIDs.map(fetchCertification);

  try {
    const results = await Promise.all(fetchTasks);
    const certifications = results.filter(
      (cert): cert is Certification => cert !== null,
    );
    const svgWidth = 400;
    const svgContents = certifications.map((cert, index) =>
      certificationSVG(cert, index * svgWidth),
    );

    const totalWidth = certifications.length * svgWidth;
    const combinedSVG = `<svg width="${totalWidth}" height="250" viewBox="0 0 ${totalWidth} 250" xmlns="http://www.w3.org/2000/svg">${svgContents.join(
      '',
    )}</svg>`;

    res.send(combinedSVG);
  } catch (error) {
    console.error('Failed to process certifications:', error);
    res.status(500).send('Failed to process certifications');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;

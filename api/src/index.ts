import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { fetchCertification, createSVG } from './helper';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

interface Certification {
  credentialID: string;
  courseName: string;
  issuedBy: string;
  complete: string;
  duration: string;
  link: string;
}

app.get('/certifications', async (req: Request, res: Response) => {
  const credentialIDs = req.query.ids
    ? req.query.ids.toString().split(',')
    : [];

  if (credentialIDs.length === 0) {
    return res
      .status(400)
      .send('Invalid or missing certifications query parameter.');
  }
  const fetchTasks = credentialIDs.map((id) => fetchCertification(id));

  try {
    const results = await Promise.all(fetchTasks);
    const certifications = results.filter(
      (cert): cert is Certification => cert !== null,
    );
    const svgs = certifications.map((cert) => createSVG(cert));

    res.send(svgs.join('\n'));
  } catch (error) {
    console.error('Failed to process certifications:', error);
    res.status(500).send('Failed to process certifications');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

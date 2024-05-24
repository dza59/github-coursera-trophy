import axios from 'axios';
import cheerio from 'cheerio';
import { Certification } from './interfaces';
import { certificationSVG } from './svgTemplates';

export function createSVG(cert: Certification): string {
  return certificationSVG(cert);
}

export async function fetchCertification(credentialID: string) {
  const url = `https://www.coursera.org/account/accomplishments/verify/${credentialID}`;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const courseName = $('.course-name-header a').text().trim();
    if (!courseName) return null; // Skip adding if course name is empty

    const issuedBy = $('.partner-desc a').text().trim();
    const complete = $('div.course-details').find('p').eq(0).text().trim();
    const duration = $('div.course-details').find('p').eq(1).text().trim();

    return {
      credentialID,
      courseName,
      issuedBy,
      complete,
      duration,
      link: url,
    };
  } catch (error: any) {
    console.error(
      'Error fetching certification for ID:',
      credentialID,
      error.message,
    );
    return null;
  }
}

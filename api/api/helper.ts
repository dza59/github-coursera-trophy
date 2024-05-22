import axios from 'axios';
import cheerio from 'cheerio';
import { JSDOM } from 'jsdom';

interface Certification {
  credentialID: string;
  courseName: string;
  issuedBy: string;
  complete: string;
  duration: string;
  link: string;
}

export function createSVG(cert: Certification): string {
  // Define a complete SVG template with proper headers
  return `
    <svg width="600" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="580" height="180" fill="lightblue" stroke="black" stroke-width="2"/>
      <text x="20" y="40" font-family="Arial" font-size="16" fill="black">Course Name: ${cert.courseName}</text>
      <text x="20" y="70" font-family="Arial" font-size="16" fill="black">Issued By: ${cert.issuedBy}</text>
      <text x="20" y="100" font-family="Arial" font-size="16" fill="black">Completion Date: ${cert.complete}</text>
      <text x="20" y="130" font-family="Arial" font-size="16" fill="black">Hours: ${cert.duration}</text>
      <a x="20" y="160" href="${cert.link}" target="_blank">
        <text x="20" y="160"  font-size="16" font-family="Arial"  fill="black" >View Certification</text>
      </a>
    </svg>
  `;
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
    return null; // Return null in case of error to filter out later
  }
}

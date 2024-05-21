import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

interface Certification {
  credentialID: string;
  courseName: string;
  issuedBy: string;
  complete: string;
  duration: string;
  link: string;
}

const baseURL = import.meta.env.VITE_API_URL;

function App() {
  const [input, setInput] = useState<string>('');
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [generatedUrl, setGeneratedUrl] = useState<string>('');

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setInput(event.target.value);
    setGeneratedUrl('');
  };

  const handleSubmit = async (): Promise<void> => {
    const trimmedInput = input.trim();
    if (!trimmedInput) {
      alert('Please enter at least one Credential ID');
      return;
    }
    const credentialIDs = input.split(' ').map((id) => id.trim()); // Converts input to an array of IDs
    const url = `${baseURL}/certifications?ids=${encodeURIComponent(
      credentialIDs.join(','),
    )}`;
    setGeneratedUrl(url); // Store the generated URL for copying

    try {
      const response = await axios.get(url);

      setCertifications(response.data.certifications);
    } catch (error) {
      console.error('Failed to fetch certifications:', error);
      setCertifications([]); // Clear certifications on error
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(generatedUrl).then(
      () => {
        alert('URL copied to clipboard!');
      },
      (err) => {
        console.error('Failed to copy URL: ', err);
      },
    );
  };

  return (
    <div className='App'>
      <input
        type='text'
        value={input}
        onChange={handleInputChange}
        placeholder='Enter Credential IDs separated by space'
      />
      <button onClick={handleSubmit}>Get Certifications</button>
      {generatedUrl && (
        <div>
          <input type='text' value={generatedUrl} readOnly />
          <button onClick={handleCopyUrl}>Copy URL</button>
        </div>
      )}
    </div>
  );
}
export default App;

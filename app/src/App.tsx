import React, { useState } from 'react';
import './App.css';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import Modal from './components/Modal';

const baseURL = import.meta.env.VITE_API_URL;

function App() {
  const [credentialIDs, setCredentialIDs] = useState(['']); // Manage multiple credential inputs
  const [generatedUrl, setGeneratedUrl] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newCredentialIDs = [...credentialIDs];
    newCredentialIDs[index] = event.target.value;
    setCredentialIDs(newCredentialIDs);
  };

  const addCredentialInput = (): void => {
    setCredentialIDs([...credentialIDs, '']); // Add a new input field
  };

  const handleSubmit = async (): Promise<void> => {
    const nonEmptyIDs = credentialIDs.filter((id) => id.trim() !== ''); // Filter out empty IDs
    if (nonEmptyIDs.length === 0) {
      alert('Please enter at least one Credential ID');
      return;
    }
    const url = `${baseURL}/certifications?ids=${encodeURIComponent(
      nonEmptyIDs.join(','),
    )}`;
    setGeneratedUrl(url); // Store the generated URL for copying
    setCredentialIDs(nonEmptyIDs);
    setIsCopied(false);
  };

  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(generatedUrl)
      .then(() => {
        setIsCopied(true); // Change state to indicate URL has been copied
        alert('URL copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy URL: ', err);
      });
  };

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  return (
    <div className='app text-3xl font-bold px-4 py-6'>
      <div className='text-red mb-20'>
        <h1 className='font-bold text-6xl text-white font-superwoobly'>
          Coursera Trophy Generator
        </h1>
      </div>

      {/* Tailwind UI Modal */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} />

      <div className='max-w-lg mx-auto bg-white rounded-lg border border-gray-200 shadow-md p-6 space-y-4 my-5'>
        <div className='flex justify-center items-center h-full'>
          <p className='text-lg font-mono flex items-center'>
            GRAB and GO with a single click!
            <AiOutlineQuestionCircle
              onClick={openModal}
              size={30}
              className='text-regal-blue text-xl ml-2 cursor-pointer'
            />
          </p>
        </div>
        <p className='flex items-center text-gray-500 text-sm font-mono'>
          effortlessly create and share elegant SVGs of your Coursera
          certifications
        </p>

        {credentialIDs.map((id, index) => (
          <div key={index} className='flex items-center space-x-2'>
            <input
              type='text'
              value={id}
              onChange={(event) => handleInputChange(index, event)}
              placeholder='Enter Credential ID'
              className='block font-mono w-full px-4 py-3 text-base placeholder-gray-500 text-gray-700 bg-white border rounded-lg focus:regal-blue-500 focus:border-regal-blue-500 border-slate-300	'
            />
            {index === credentialIDs.length - 1 && (
              <button
                onClick={addCredentialInput}
                className='p-2 text-regal-blue hover:none'
              >
                +
              </button>
            )}
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className='w-full font-superwoobly text-regal-blue bg-white border hover:text-white border-regal-blue hover:bg-regal-blue focus:ring-4 focus:regal-blue-300 font-medium rounded-lg text-base px-5 py-3 text-center'
        >
          Generate URL
        </button>
        {generatedUrl && (
          <div className='space-y-2'>
            <input
              type='text'
              value={generatedUrl}
              readOnly
              className='block w-full px-4 py-3 text-base text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
            <button
              onClick={handleCopyUrl}
              className={`w-full font-superwoobly font-medium rounded-lg text-base px-5 py-3 text-center transition duration-300 ${
                isCopied
                  ? 'bg-regal-500 text-white bg-blue-500'
                  : 'text-blue-500 bg-white border border-blue-500 hover:bg-blue-500 hover:text-white'
              }`}
            >
              {isCopied ? 'Copied!' : 'Copy URL'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

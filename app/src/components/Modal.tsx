// src/components/Modal.tsx
import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  findTitle,
  findContent,
  aboutTitle,
  aboutContent,
  aboutContentP1,
  aboutContentP2,
  aboutContentP1Title,
  aboutContentP2Title,
  findContentExample,
} from '../Constants';
interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-40' />
        </Transition.Child>
        <div className='fixed inset-0 z-50 overflow-y-auto '>
          <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-12'>
            <Transition.Child
              as={React.Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-3xl bg-white p-8 text-left align-middle shadow-2xl transition-all'>
                <div className='font-mono'>
                  <h5 className='text-2xl font-semibold text-gray-900 mb-4'>
                    {findTitle}
                  </h5>
                  <p className='text-sm text-gray-600 text-pretty'>
                    {findContent}
                  </p>
                  <p className='text-xs text-gray-600 text-pretty'>
                    {findContentExample}
                  </p>

                  <h5 className='text-2xl font-semibold text-gray-900 mt-6 mb-4'>
                    {aboutTitle}
                  </h5>
                  <p className='text-sm text-gray-600'>
                    {aboutContent}
                    <ul className='list-disc pl-5 mt-2'>
                      <li>
                        <span className='font-bold text-regal-blue'>
                          {aboutContentP1Title}
                        </span>
                        {aboutContentP1}
                      </li>
                      <li>
                        <span className='font-bold text-regal-blue'>
                          {aboutContentP2Title}
                        </span>
                        {aboutContentP2}
                      </li>
                    </ul>
                  </p>
                </div>
                <div className='mt-6'>
                  <button
                    type='button'
                    className='inline-flex font-mono justify-center rounded-md border border-transparent shadow-sm px-6 py-3 bg-regal-blue text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;

import React, { useState } from 'react';

type Props = {
  items: string[];
};
const MultiSelect = (props: Props) => {
  const [text, setText] = useState('');

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <input
        className='w-full bg-red-200'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div
        className='w-full bg-white rounded-md shadow-lg shadow-indigo-500/50'
        role='menu'
        aria-orientation='vertical'
        aria-labelledby='menu-button'>
        <div className='py-1' role='none'>
          <label
            className='block px-4 py-2 text-sm text-gray-700'
            role='menuitem'>
            Account settings
          </label>
          <label
            className='block px-4 py-2 text-sm text-gray-700'
            role='menuitem'>
            Support
          </label>
          <label
            className='block px-4 py-2 text-sm text-gray-700'
            role='menuitem'>
            License
          </label>
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;

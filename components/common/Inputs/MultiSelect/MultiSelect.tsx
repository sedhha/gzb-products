import React, { useState } from 'react';

type Props = {
  items: string[];
  addedItems: string[];
  updateAddedItems: (newItem: string, remove: boolean) => void;
};
const MultiSelect = ({ items }: Props) => {
  const [text, setText] = useState('');
  const interceptedResults = items.filter((element) =>
    element.toLowerCase().includes(text.toLowerCase())
  );
  const [touched, setTouched] = useState(false);
  const showClearIcon = text !== '';

  return (
    <div className='w-full py-2 bg-white rounded-md shadow-lg gap-y-4 shadow-indigo-500/50'>
      <div className='flex flex-row items-center justify-around w-full p-2 border-b-2 border-indigo-500'>
        <input
          className='w-full focus:outline-none'
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setTouched(true)}
        />
        {showClearIcon && (
          <div
            onClick={() => {
              setTouched(false);
              setText('');
            }}
            className={
              'funfuse-icons-cross h-[1rem] w-[1rem] bg-gray-600 hover:scale-90'
            }
          />
        )}
      </div>

      <div className='py-1 overflow-y-auto max-h-32 funfuseScrollbar'>
        {touched &&
          interceptedResults.map((element, id) => (
            <label
              key={id}
              className='block px-4 py-1 text-sm text-gray-700'
              role='menuitem'>
              {element}
            </label>
          ))}
      </div>
      {touched ? null : (
        <label className='p-2 text-gray-700'>
          Start typing for suggestions
        </label>
      )}
    </div>
  );
};

export default MultiSelect;

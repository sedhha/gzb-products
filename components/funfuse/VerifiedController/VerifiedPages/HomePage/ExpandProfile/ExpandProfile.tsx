import React from 'react';

type Props = {
  showFullDisplay: boolean;
  updateDisplay: (show: boolean) => void;
};

export default function ExpandProfile({
  showFullDisplay,
  updateDisplay,
}: Props) {
  return (
    <React.Fragment>
      {!showFullDisplay && (
        <React.Fragment>
          <label
            className='mt-2 text-xs text-center text-gray-500 font-funfuse'
            onClick={() => updateDisplay(true)}>
            Show More
          </label>
          <div
            onClick={() => updateDisplay(true)}
            className='funfuse-icons-down h-[1rem] w-[1rem] bg-gray-600 hover:scale-90 cursor-pointer rotate-90'
          />
        </React.Fragment>
      )}
      {showFullDisplay && (
        <React.Fragment>
          <label
            className='mt-2 text-xs text-center text-gray-500 font-funfuse'
            onClick={() => updateDisplay(false)}>
            Show Less
          </label>
          <div
            onClick={() => updateDisplay(false)}
            className='funfuse-icons-down h-[1rem] w-[1rem] bg-gray-600 hover:scale-90 cursor-pointer -rotate-90'
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

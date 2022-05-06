import React from 'react';

type Props = {
  elements: string[];
  displayLabel: string;
  showFullDisplay: boolean;
  updateDisplay: (show: boolean) => void;
};

const getColorClass = (index: number): string => {
  if (index % 3 === 0) return 'bg-funfuse';
  if (index % 3 === 1) return 'bg-funfuse_red';
  return 'bg-funfuse_green';
};

export default function ComponentDisplay({
  showFullDisplay,
  elements,
  displayLabel,
  updateDisplay,
}: Props) {
  const hiddenElements = elements.length - 3;
  return (
    <React.Fragment>
      <label className='w-full mx-2 my-0 font-semibold font-funfuse'>
        {displayLabel}
      </label>
      <div className='grid grid-cols-3 gap-[0.25rem] w-full mt-1'>
        {elements.map((skill, index) => (
          <div
            key={skill}
            className={`${getColorClass(index)} ${
              index > 2 ? (showFullDisplay ? '' : 'hidden') : ''
            } px-2 py-1 text-white font-funfuse text-xs rounded roundex-sm flex justify-center items-center`}>
            {skill}
          </div>
        ))}
      </div>
      {!showFullDisplay && hiddenElements > 0 ? (
        <label
          className='mt-0.5 text-xs text-center text-indigo-500 underline underline-offset-1 font-funfuse'
          onClick={() => updateDisplay(true)}>
          {`+ ${hiddenElements} more`}
        </label>
      ) : hiddenElements <= 0 ? null : (
        <label
          className='mt-0.5 text-xs text-center text-indigo-500 underline underline-offset-1 font-funfuse'
          onClick={() => updateDisplay(false)}>
          Hide
        </label>
      )}
    </React.Fragment>
  );
}

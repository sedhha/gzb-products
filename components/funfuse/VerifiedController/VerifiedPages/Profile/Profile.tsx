import ThemeInputTextArea from '@/components/common/Inputs/ThemeInputTextArea';
import ToggleButton from '@/components/funfuse/Buttons/ToggleButton/ToggleButton';
import FullWidthImage from '@/components/funfuse/FullWidthImage/FullWidthImage';
import { useAppSelector } from '@redux-tools/hooks';
import React, { useState } from 'react';
import Select, { GroupBase, StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
const skillFields = [
  {
    label: 'Web',
    value: 'Web',
  },
  {
    label: 'Supply Chain',
    value: 'Supply Chain',
  },
  {
    label: 'Digital Marketing',
    value: 'Digital Marketing',
  },
  {
    label: 'Inventory Management',
    value: 'Inventory Management',
  },
  {
    label: 'Sales',
    value: 'Sales',
  },
  {
    label: 'Marketing',
    value: 'Marketing',
  },
  {
    label: 'Finance',
    value: 'Finance',
  },
  {
    label: 'HR',
    value: 'HR',
  },
  {
    label: 'Legal',
    value: 'Legal',
  },
  {
    label: 'Customer Service',
    value: 'Customer Service',
  },
  {
    label: 'Customer Support',
    value: 'Customer Support',
  },
  {
    label: 'Customer Experience',
    value: 'Customer Experience',
  },
  {
    label: 'Customer Service',
    value: 'Customer Service',
  },
  {
    label: 'Data Warehousing',
    value: 'Data Warehousing',
  },
  {
    label: 'Agriculture',
    value: 'Agriculture',
  },
  {
    label: 'Construction',
    value: 'Construction',
  },
  {
    label: 'Education',
    value: 'Education',
  },
  {
    label: 'Engineering',
    value: 'Engineering',
  },
  {
    label: 'Healthcare',
    value: 'Healthcare',
  },
  {
    label: 'Hospitality',
    value: 'Hospitality',
  },
  {
    label: 'Human Resources',
    value: 'Human Resources',
  },
  {
    label: 'Information Technology',
    value: 'Information Technology',
  },
  {
    label: 'Legal',
    value: 'Legal',
  },
  {
    label: 'Manufacturing',
    value: 'Manufacturing',
  },
  {
    label: 'Marketing',
    value: 'Marketing',
  },
  {
    label: 'Media',
    value: 'Media',
  },
  {
    label: 'Operations',
    value: 'Operations',
  },
  {
    label: 'Product Development',
    value: 'Product Development',
  },
  {
    label: 'Project Management',
    value: 'Project Management',
  },
  {
    label: 'Real Estate',
    value: 'Real Estate',
  },
  {
    label: 'Retail',
    value: 'Retail',
  },
  {
    label: 'Sales',
    value: 'Sales',
  },
  {
    label: 'Science',
    value: 'Science',
  },
  {
    label: 'Social Services',
    value: 'Social Services',
  },
  {
    label: 'Strategy',
    value: 'Strategy',
  },
  {
    label: 'Technology',
    value: 'Technology',
  },
  {
    label: 'Training',
    value: 'Training',
  },
  {
    label: 'Transportation',
    value: 'Transportation',
  },
  {
    label: 'Other',
    value: 'Other',
  },
];

const customStyles: StylesConfig = {
  control: (base) => ({
    ...base,
  }),
  menu: (base) => ({
    ...base,
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: '8rem',
  }),
  multiValue: (style) => ({
    ...style,
    color: '#fff',
    background: '#5B3FFF',
  }),
  multiValueLabel: (style) => ({
    ...style,
    color: '#fff',
    background: '#5B3FFF',
  }),
};

type OptionType = { label: string; value: string };

export default function Profile() {
  const { user } = useAppSelector((state) => state.user);
  const [bio, setBio] = useState(user?.bio ?? '');

  const [skills, setSkills] = useState<OptionType[]>(user?.skills ?? []);

  return (
    <div className='flex flex-col items-center h-full p-2 overflow-auto'>
      <div className='relative h-[10rem] w-[10rem]'>
        <FullWidthImage
          src={'/funfuse/avatar.png'}
          alt={'User Avatar'}
          containerDivClass='rounded-full overflow-hidden'
        />
        <div className='absolute top-0 left-0 w-full h-full bg-black rounded-full shadow-lg cursor-pointer gap-x-2 shadow-indigo-500/50 opacity-60'>
          <div
            className={
              'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 funfuse-icons-edit h-[2rem] w-[2rem] bg-white hover:scale-90'
            }
          />
        </div>
      </div>
      <label className='w-full p-0 text-xl'>Bio</label>
      <ThemeInputTextArea
        placeholder='Tell the Community about yourself!'
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        row={3}
        className={'w-full mt-1 p-4'}
      />
      <label className='w-full p-0 mt-2 text-xl'>Skills</label>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={skills}
        isMulti
        options={skillFields}
        className='w-full'
        maxMenuHeight={55}
        styles={customStyles}
        onChange={(newSkills) => setSkills(newSkills as OptionType[])}
      />
      <label className='w-full p-0 mt-2 text-xl'>Interests</label>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={skills}
        isMulti
        options={skillFields}
        className='w-full'
        maxMenuHeight={55}
        styles={customStyles}
        onChange={(newSkills) => setSkills(newSkills as OptionType[])}
      />
      <label className='w-full p-0 mt-2 text-xl'>Discoverability</label>
      <label className='w-full text-gray-500 text-md'>
        Let&apos;s other users discover you.
      </label>
      <ToggleButton />
    </div>
  );
}

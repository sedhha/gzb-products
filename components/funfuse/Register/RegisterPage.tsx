import React, { useState } from 'react';
import classes from './RegisterPage.module.scss';
import WhiteLogo from '@/components/funfuse/Logos/WhiteLogo';
import WhiteButton from '@/components/funfuse/Buttons/WhiteButton/WhiteButton';
import InputBox from '@/components/common/Inputs/InputBox';
import { FcManager, FcBusinesswoman, FcBusinessman } from 'react-icons/fc';
import SelectableCard from '@/components/funfuse/SelectableCard/SelectableCard';
const genders = {
  male: 'Male',
  female: 'Female',
  others: 'Other',
};

type genderCardChange = (id: string) => void;
const genderCards = [
  {
    id: genders.male,
    icon: (callback: genderCardChange) => (
      <FcManager className='text-7xl' onClick={() => callback(genders.male)} />
    ),
    description: 'Man',
  },
  {
    id: genders.female,
    icon: (callback: genderCardChange) => (
      <FcBusinesswoman
        className='text-7xl'
        onClick={() => callback(genders.female)}
      />
    ),
    description: 'Woman',
  },
  {
    id: genders.others,
    icon: (callback: genderCardChange) => (
      <FcBusinessman
        className='text-7xl'
        onClick={() => callback(genders.others)}
      />
    ),
    description: 'Other',
  },
];

export default function RegisterPage() {
  const [gender, setGender] = useState(genders.male);
  const [datePickerType, setDatePickerType] = useState<string>('text');
  return (
    <div className={classes.Card}>
      <div className={classes.LogoHeight}>
        <WhiteLogo />
      </div>
      <InputBox
        placeholder={'Email Address'}
        type={'email'}
        outlineColor={'#fff'}
        className='mx-4 mb-1 text-white'
      />
      <InputBox
        placeholder={'Unique Username'}
        type={'email'}
        outlineColor={'#fff'}
        className='mx-4 mb-1 text-white'
      />
      <InputBox
        placeholder={'Password'}
        type={'password'}
        outlineColor={'#fff'}
        className='mx-4 mb-1 text-white'
      />
      <InputBox
        placeholder={'Re-Enter Password'}
        type={'password'}
        outlineColor={'#fff'}
        className='mx-4 mb-1 text-white'
      />
      <InputBox
        placeholder={'Birth Date'}
        type={datePickerType}
        onFocus={() => setDatePickerType('date')}
        onBlur={() => setDatePickerType('text')}
        outlineColor={'#fff'}
        className='mx-4 mb-1 text-white'
        style={{ colorScheme: 'dark' }}
      />
      <div className='flex flex-row justify-center gap-2 mt-2 width-full'>
        {genderCards.map((card) => (
          <SelectableCard
            isSelected={card.id === gender}
            key={card.id}
            icon={card.icon(setGender)}
            description={card.description}
          />
        ))}
      </div>

      <div className={'mt-4 text-center'}>
        <WhiteButton
          icon={<div className={classes.LoginButton}>Next</div>}></WhiteButton>
      </div>

      <br />
      <br />
      <br />
    </div>
  );
}

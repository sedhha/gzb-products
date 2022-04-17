import React, { useState } from 'react';
import classes from './RegisterPage.module.scss';
import WhiteLogo from '@/components/funfuse/Logos/WhiteLogo';
import WhiteButton from '@/components/funfuse/Buttons/WhiteButton/WhiteButton';
import InputBox from '@/components/common/Inputs/InputBox';
import { FcManager, FcBusinesswoman, FcBusinessman } from 'react-icons/fc';
import SelectableCard from '@/components/funfuse/SelectableCard/SelectableCard';
import { IFunFuseRegisterUser } from '@constants/interfaces/funfuse';
import { IResponse } from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import FunFuseSpinner from '@/components/common/Spinner/FunFuseSpinner';
import Head from 'next/head';

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
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [reEnterPassword, setReEnterPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>(
    new Date('12-01-2001').toLocaleDateString()
  );
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const errorHandler = (error: any, message?: string) => {
    console.log(error);
    setLoading(false);
    setSuccess('');
    message
      ? setError(message)
      : setError('Client Side Unexpected Error Happened');
  };

  const successHandler = () => {
    setError('');
    setLoading(false);
    setSuccess('You have been successfully registered with FunFuse!');
  };

  const userRegistrationHandler = () => {
    setLoading(true);
    if (password !== reEnterPassword) {
      errorHandler('', 'Passwords do not match');
      return;
    }
    const registrationPayload: IFunFuseRegisterUser = {
      name,
      email,
      password,
      gender,
      dob: dateOfBirth,
      username: userName,
    };
    fetch('/api/funfuse/auth/register-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationPayload),
    })
      .then((response) =>
        response
          .json()
          .then((data: IResponse) => {
            if (data.error) {
              errorHandler(data.opsDetails, data.opsDetails.details);
              return;
            } else {
              console.log('here');
              successHandler();
            }
          })
          .catch(errorHandler)
      )
      .catch(errorHandler);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Register with Funfuse</title>
      </Head>
      <div className={classes.Card}>
        <div className={classes.LogoHeight}>
          <WhiteLogo />
        </div>
        <InputBox
          placeholder={'Name'}
          type={'text'}
          outlineColor={'#fff'}
          className='mx-4 mb-1 text-white'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputBox
          placeholder={'Email Address'}
          type={'email'}
          outlineColor={'#fff'}
          className='mx-4 mb-1 text-white'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          placeholder={'Unique Username'}
          type={'email'}
          outlineColor={'#fff'}
          className='mx-4 mb-1 text-white'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <InputBox
          placeholder={'Password'}
          type={'password'}
          outlineColor={'#fff'}
          className='mx-4 mb-1 text-white'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputBox
          placeholder={'Re-Enter Password'}
          type={'password'}
          outlineColor={'#fff'}
          className='mx-4 mb-1 text-white'
          value={reEnterPassword}
          onChange={(e) => setReEnterPassword(e.target.value)}
        />
        <InputBox
          placeholder={'Birth Date'}
          type={datePickerType}
          onFocus={() => setDatePickerType('date')}
          onBlur={() => setDatePickerType('text')}
          outlineColor={'#fff'}
          className='mx-4 mb-1 text-white'
          style={{ colorScheme: 'dark' }}
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
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
        {error !== '' && (
          <label className='text-center text-red-600'>{error}</label>
        )}
        {success !== '' && (
          <label className='text-center text-lime-600'>{success}</label>
        )}
        {!loading ? (
          <div className={'mt-4 text-center'}>
            <WhiteButton
              icon={
                <div
                  className={classes.LoginButton}
                  onClick={userRegistrationHandler}>
                  Register
                </div>
              }></WhiteButton>
          </div>
        ) : (
          <FunFuseSpinner />
        )}

        <br />
      </div>
    </React.Fragment>
  );
}

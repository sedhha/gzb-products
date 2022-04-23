import React, { useState } from 'react';
import Auth from '@firebase-client/client.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { loginUser } from '@redux-slices/user';
import { useAppDispatch } from '@redux-tools/hooks';
import Head from 'next/head';
import ThemeLogo from '@/components/funfuse/Logos/ThemeLogo';
import ThemeInputBox from '@/components/common/Inputs/ThemeInputBox';
import { FirebaseError } from 'firebase/app';
import ThemeButton from '../Buttons/ThemeButton/ThemeButton';
import { firebaseErrorTranslater } from '@firebase-server/public/errorTranslator';
import { IResponse } from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import { IFunFuseRegisterUser } from '@constants/interfaces/funfuse';
import ThemeDatePicker from '@/components/common/Inputs/ThemeDatePicker';
import SelectableCardAlt from '../SelectableCard/SelectableCardAlt';
import ThemeSpinner from '../Spinner/ThemeSpinner';
import Link from 'next/link';

const genders = {
  male: 'Male',
  female: 'Female',
  others: 'Other',
};

const genderChoices = [
  {
    description: genders.male,
    iconClass: 'funfuse-icons-man',
  },
  {
    description: genders.female,
    iconClass: 'funfuse-icons-woman',
  },
  {
    description: genders.others,
    iconClass: 'funfuse-icons-other',
  },
];

export default function LoginPage() {
  const [gender, setGender] = useState(genders.male);
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

  const isError = error !== '';
  const isSuccess = success !== '';

  return (
    <React.Fragment>
      <Head>
        <title>Register with Funfuse</title>
      </Head>
      <div className='flex flex-col justify-center w-screen h-screen p-2'>
        <div className='h-[10rem] w-auto'>
          <ThemeLogo />
        </div>
        <ThemeInputBox
          iconClass='funfuse-icons-name'
          placeholder='Name'
          onChange={(e) => setName(e.target.value)}
          value={name}
          type={'text'}
        />
        <ThemeInputBox
          iconClass='funfuse-icons-email'
          placeholder='Enter Email Address'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type={'email'}
        />
        <ThemeInputBox
          iconClass='funfuse-icons-name'
          placeholder='Unique Username'
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          type={'text'}
        />
        <ThemeInputBox
          iconClass='funfuse-icons-lock'
          placeholder='Enter Password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type={'password'}
        />
        <ThemeInputBox
          iconClass='funfuse-icons-lock'
          placeholder='Re-Enter Password'
          onChange={(e) => setReEnterPassword(e.target.value)}
          value={reEnterPassword}
          type={'password'}
        />

        <ThemeDatePicker
          iconClass='funfuse-icons-calendar'
          placeholder='Date of Birth'
          onChange={(e) => setDateOfBirth(e.target.value)}
          value={dateOfBirth}
        />
        <div className='flex flex-row justify-center w-full'>
          {genderChoices.map((element) => (
            <SelectableCardAlt
              key={element.description}
              iconClass={element.iconClass}
              isSelected={element.description === gender}
              setSelected={() => setGender(element.description)}
              description={element.description}
            />
          ))}
        </div>
        {isError ? (
          <label className='m-2 mt-4 text-red-400 font-funfuse'>{error}</label>
        ) : isSuccess ? (
          <label className='m-2 mt-4 text-green-400 font-funfuse'>
            {success}
          </label>
        ) : null}
        {loading ? (
          <div className='w-3/4 mx-auto'>
            <ThemeSpinner />
          </div>
        ) : (
          <ThemeButton
            buttonText={'Register'}
            twClass='w-3/4 mx-auto text-xl mt-2'
            buttonCallback={userRegistrationHandler}
          />
        )}
        <label className='m-2 mt-4 text-gray-400 font-funfuse'>
          Already have an account ?{' '}
          <Link href='/funfuse/login' passHref>
            <a className='underline cursor-pointer text-funfuse'>Login Here.</a>
          </Link>
        </label>
      </div>
    </React.Fragment>
  );
}

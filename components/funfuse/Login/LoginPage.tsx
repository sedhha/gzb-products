import React, { useState } from 'react';
import classes from './LoginPage.module.scss';
import WhiteLogo from '@/components/funfuse/Logos/WhiteLogo';
import WhiteButton from '@/components/funfuse/Buttons/WhiteButton/WhiteButton';
import InputBox from '@/components/common/Inputs/InputBox';
import Auth from '@firebase-client/client.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { loginUser } from '@redux-slices/user';
import { useAppDispatch } from '@redux-tools/hooks';
export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();

  const errorHandler = (error: any) => {
    console.log(error);
  };

  const loginHander = () => {
    signInWithEmailAndPassword(Auth, email, password)
      .then((userRecord) => {
        userRecord.user
          .getIdToken()
          .then((token) => dispatch(loginUser(token)))
          .catch(errorHandler);
      })
      .catch(errorHandler);
  };

  return (
    <div className={classes.Card}>
      <div className={classes.LogoHeight}>
        <WhiteLogo />
      </div>
      <label className={classes.TagLine}>
        Fuse in to small business communities and grow together!
      </label>
      <InputBox
        placeholder={'Email Address'}
        type={'email'}
        outlineColor={'#fff'}
        className='mx-4 text-white'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputBox
        placeholder={'Password'}
        type={'password'}
        className='mx-4 text-white'
        outlineColor={'#fff'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={'mt-4 text-center'}>
        <WhiteButton
          icon={
            <div className={classes.LoginButton} onClick={loginHander}>
              Login
            </div>
          }></WhiteButton>
      </div>

      <br />
      <br />
      <br />
    </div>
  );
}

import ThemeInputTextArea from '@/components/common/Inputs/ThemeInputTextArea';
import ThemeButton from '@/components/funfuse/Buttons/ThemeButton/ThemeButton';
import ToggleButton from '@/components/funfuse/Buttons/ToggleButton/ToggleButton';
import FullWidthImage from '@/components/funfuse/FullWidthImage/FullWidthImage';
import { useAppDispatch, useAppSelector } from '@redux-tools/hooks';
import React, { useCallback, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import { useDropzone } from 'react-dropzone';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@firebase-client/client.config';
import Spinner from '@/components/common/Spinner/FunFuseSpinner';
import { IResponse } from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import Auth from '@firebase-client/client.config';
import { logOut } from '@redux-slices/user';
import { useRouter } from 'next/router';

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
  const { user, firebaseToken } = useAppSelector((state) => state.user);
  const [bio, setBio] = useState(user?.bio ?? '');
  const [error, setError] = useState(false);
  const [file, setFile] = React.useState({
    file: null,
    preview: '/funfuse/avatar.png',
  });
  const [imageUploaded, setImageUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const updateSuccessEffects = () => {
    setLoading(false);
    setError(false);
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
    }, 3000);
  };

  const signOut = () => {
    Auth.signOut();
    dispatch(logOut());
    router.push('/funfuse/login');
  };

  const [skills, setSkills] = useState<OptionType[]>(user?.skills ?? []);
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      console.log(fileRejections);
      setError(true);
      if (fileRejections[0].errors[0].code === 'file-too-large') {
        setErrorMessage('File Size Must be less than 2 Megabytes.');
      } else setErrorMessage('Uploaded Files are not image files.');
    } else setError(false);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFile({
        file: file,
        preview: URL.createObjectURL(file),
      });
      setImageUploaded(true);
    }
  }, []);
  const uploadImageHandler = () => {
    if (!imageUploaded || loading) {
      return;
    }
    const storageLoc = `profile-pics/${user?.uid ?? ''}/profile-photo`;
    setLoading(true);
    const storageRef = ref(storage, storageLoc);
    if (file.file)
      uploadBytes(storageRef, file.file, {
        contentType: (file.file as File).type,
      })
        .then(() => {
          fetch('/api/funfuse/ops/update-dp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': firebaseToken ?? '',
            },
          })
            .then((res) =>
              res
                .json()
                .then((res: IResponse) => {
                  if (res.error) {
                    setError(true);
                    setErrorMessage(res.opsDetails.details);
                    setLoading(false);
                  } else {
                    updateSuccessEffects();
                    getDownloadURL(storageRef)
                      .then((url) => console.log('Public Url = ', url))
                      .catch((error) =>
                        console.log(
                          'Error while trying to get public url = ',
                          error
                        )
                      );
                  }
                })
                .catch((error) => {
                  setError(true);
                  setErrorMessage(error.message);
                  setLoading(false);
                })
            )
            .catch((error) => {
              setError(true);
              setErrorMessage(error.message);
              setLoading(false);
            });
        })
        .catch(() => {
          setErrorMessage(
            'Unable to Upload Image. Make sure the Image Size is less than 5MBs.'
          );
          setError(true);
          setLoading(false);
        });
    setImageUploaded(false);
  };
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: 5000000, //5MB
    accept: ['image/*'],
    onDrop,
  });

  return (
    <div className='flex flex-col items-center h-full p-2 overflow-auto'>
      {error && (
        <label className='mb-1 text-red-600 font-funfuse'>{errorMessage}</label>
      )}
      {uploadSuccess && (
        <label className='mb-1 text-lime-500 font-funfuse'>
          Upload was Successful
        </label>
      )}
      <div className='relative h-[10rem] w-[10rem]'>
        <FullWidthImage
          src={file.preview}
          alt={'User Avatar'}
          dimensionSpec
          containerDivClass='rounded-full overflow-hidden h-[10rem] w-[10rem]'
        />
        <div
          {...getRootProps()}
          className='absolute top-0 left-0 w-full h-full bg-black rounded-full shadow-lg cursor-pointer gap-x-2 shadow-indigo-500/50 opacity-60'>
          <input {...getInputProps()} />
          {loading ? (
            <div className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
              <Spinner />
            </div>
          ) : (
            <div
              className={
                'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 funfuse-icons-edit h-[2rem] w-[2rem] bg-white hover:scale-90'
              }
            />
          )}
        </div>
      </div>
      {imageUploaded && (
        <ThemeButton
          buttonText='Upload Image'
          twClass='rounded-md mt-2'
          buttonCallback={uploadImageHandler}
        />
      )}
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
      <ThemeButton
        buttonText={'Update Changes'}
        buttonCallback={() => null}
        twClass='rounded-md mt-2'
      />
      <ThemeButton
        buttonText={'Log Out'}
        buttonCallback={signOut}
        twClass='rounded-md mt-2'
      />
    </div>
  );
}

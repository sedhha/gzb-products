import React, { useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@firebase-client/client.config';
import ResizeSpinner from '@/components/funfuse/Spinner/ResizeSpinner';

type Props = {
  imageUrl?: string;
  altString?: string;
};

export default function ImageCard({ imageUrl, altString }: Props) {
  const [uri, setUri] = useState('');
  const [imageReady, setImageReady] = useState(false);
  useEffect(() => {
    if (!imageUrl) setUri('/funfuse/avatar-02.jpg');
    else {
      if (imageUrl.startsWith('/')) {
        setUri(imageUrl);
        setImageReady(true);
      } else {
        const storageRef = ref(storage, imageUrl);
        getDownloadURL(storageRef)
          .then((url) => {
            setUri(url);
            setImageReady(true);
          })
          .catch((error) => {
            setUri('/funfuse/avatar.png');
            setImageReady(true);
            console.log('Error Loading Image from Storage: ', error);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);
  return imageReady ? (
    //eslint-disable-next-line @next/next/no-img-element
    <img
      alt={altString ?? 'Message Image'}
      src={uri ?? '/funfuse/avatar-02.jpg'}
      className='flex-1 rounded-full shadow-lg shadow-indigo-500/50 min-h-[5rem] min-w-[5rem] max-h-[5rem] max-w-[5rem]'
    />
  ) : (
    <ResizeSpinner />
  );
}

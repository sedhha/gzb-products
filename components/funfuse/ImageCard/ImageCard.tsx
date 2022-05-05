import React, { useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@firebase-client/client.config';
import ResizeSpinner from '@/components/funfuse/Spinner/ResizeSpinner';

type Props = {
  imageUrl?: string;
  altString?: string;
  imgDimension?: string;
  onClick?: () => void;
};

export default function ImageCard({
  imageUrl,
  altString,
  imgDimension,
  onClick,
}: Props) {
  const [uri, setUri] = useState('');
  const [imageReady, setImageReady] = useState(false);
  const [mounted, setMounted] = useState(true);
  const imDim = imgDimension ?? '5rem';
  const styleDim = { height: imDim, width: imDim };
  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);
  useEffect(() => {
    if (!imageUrl && mounted) setUri('/funfuse/avatar-02.jpg');
    else {
      if (imageUrl && mounted && imageUrl.startsWith('/')) {
        setUri(imageUrl);
        setImageReady(true);
      } else {
        const storageRef = ref(storage, imageUrl);
        getDownloadURL(storageRef)
          .then((url) => {
            if (mounted) {
              setUri(url);
              setImageReady(true);
            }
          })
          .catch((error) => {
            if (mounted) {
              setUri('/funfuse/avatar.png');
              setImageReady(true);
            }
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
      style={styleDim}
      className={`flex-1 rounded-full shadow-lg shadow-indigo-500/50`}
      onClick={onClick}
    />
  ) : (
    <ResizeSpinner />
  );
}

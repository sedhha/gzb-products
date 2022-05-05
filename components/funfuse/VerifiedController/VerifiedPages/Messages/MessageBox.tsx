import React from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@firebase-client/client.config';
import ResizeSpinner from '@/components/funfuse/Spinner/ResizeSpinner';
import { useRouter } from 'next/router';
import { useAppSelector } from '@redux-tools/hooks';
import { verifiedRoutes } from '@/components/funfuse/constants/verifiedRoutes';
import { IFunFuseUserMessages } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import { IMessageUserUrlParams } from '@/components/funfuse/VerifiedController/VerifiedPages/Messages/MessageWindow';

export default function MessageBox({
  recieverUrl,
  name,
  textContent,
  bySelf,
  recieverUserName,
  recieverUid,
}: IFunFuseUserMessages) {
  const [iUri, setIUri] = React.useState('/funfuse/avatar-02.jpg');
  const [imageReady, setImageReady] = React.useState(false);
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();

  const gotoMessages = () => {
    if (user?.username) {
      const pathName = `/funfuse/${user?.username}/${verifiedRoutes.MESSAGES_ROUTE}/${user?.username}-${recieverUserName}`;
      router.push(
        {
          pathname: pathName,
          query: {
            name,
            imageUrl: recieverUrl,
            uid: recieverUid,
            recipientUserName: recieverUserName,
          } as IMessageUserUrlParams,
        },
        pathName
      );
    }
  };

  const updateImageByPath = (imagePath: string) => {
    if (!imagePath) return;
    if (imagePath.startsWith('/')) {
      setIUri(imagePath);
      setImageReady(true);
    } else {
      const storageRef = ref(storage, imagePath);
      getDownloadURL(storageRef)
        .then((url) => {
          setIUri(url);
          setImageReady(true);
        })
        .catch((erorr) => {
          console.log('Error Loading Image from Storage: ', erorr);
          setImageReady(true);
        });
    }
  };
  React.useEffect(() => {
    updateImageByPath(recieverUrl);
  }, [recieverUrl]);
  const newMsgValue =
    textContent.length > 60 ? `${textContent.slice(0, 60)}...` : textContent;
  const messageColorClass = bySelf ? '' : 'font-semibold';
  return (
    <React.Fragment>
      <div
        className='flex w-full gap-2'
        aria-label='Funfuse-Message-Container'
        onClick={gotoMessages}>
        {imageReady ? (
          //eslint-disable-next-line @next/next/no-img-element
          <img
            alt='Message Image'
            src={iUri ?? '/funfuse/avatar-02.jpg'}
            className='flex-1 rounded-full shadow-lg min-h-[5rem] min-w-[5rem] max-h-[5rem] max-w-[5rem]'
          />
        ) : (
          <div className='overflow-hidden max-w-24 max-h-24'>
            <ResizeSpinner spinnerSize='0.6rem' />
          </div>
        )}
        <div className='flex flex-col'>
          <div
            aria-label='Funfuse-Message-Header'
            className='flex flex-row items-center gap-2 mt-1'>
            <h2 className='text-xl text-black'>{name ?? 'John Doe'}</h2>
          </div>
          <div aria-label='Funfuse-Message-Body'>
            <label className={'text-sm text-gray-400 ' + messageColorClass}>
              {newMsgValue}
            </label>
          </div>
        </div>
      </div>
      <div className='w-full px-2 h-[0.02rem] bg-gray-500 my-2' />
    </React.Fragment>
  );
}

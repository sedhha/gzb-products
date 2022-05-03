import { IFunFuseMessageBox } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import React from 'react';
import Conversation from '@/components/funfuse/VerifiedController/VerifiedPages/Messages/Conversation';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@firebase-client/client.config';
import {
  ACTIONTYPES,
  reducer,
  initState,
  IConversationKeys,
} from '@immediate-states/funfuse/conversation.state';
type Props = {
  conversations: IFunFuseMessageBox[];
  selfUrl: string;
  recieverUrl: string;
  selfName: string;
  recieverName: string;
};

export default function Conversations({
  conversations,
  selfUrl,
  recieverUrl,
  selfName,
  recieverName,
}: Props) {
  const [state, dispatch] = React.useReducer(reducer, initState);

  const updateImageByPath = (
    imagePath: string,
    imageKey: IConversationKeys
  ) => {
    if (!imagePath) return;
    if (imagePath.startsWith('/'))
      dispatch({
        type: ACTIONTYPES.UPDATE_URI,
        payload: { newUri: imagePath, updateKey: imageKey },
      });
    else {
      const storageRef = ref(storage, imagePath);
      getDownloadURL(storageRef)
        .then((url) => {
          dispatch({
            type: ACTIONTYPES.UPDATE_URI,
            payload: { newUri: url, updateKey: imageKey },
          });
        })
        .catch((erorr) => {
          console.log('Error Loading Image from Storage: ', erorr);
          dispatch({
            type: ACTIONTYPES.UPDATE_URI,
            payload: { newUri: '/funfuse/avatar-02.jpg', updateKey: imageKey },
          });
        });
    }
  };

  React.useEffect(() => {
    updateImageByPath(selfUrl, 'self');
    updateImageByPath(recieverUrl, 'reciever');
  }, [selfUrl, recieverUrl]);

  return (
    <div className='flex flex-col items-center flex-auto gap-2 mt-2 overflow-auto'>
      {conversations.map((element) => (
        <Conversation
          key={element.time}
          name={element.fromSelf ? selfName : recieverName}
          uri={element.fromSelf ? state.selfUri : state.recieverUri}
          loading={
            element.fromSelf ? state.selfImgLoaded : state.recieverImgLoaded
          }
          fromSelf={element.fromSelf}
          textContent={element.textContent}
          time={element.time}
        />
      ))}
    </div>
  );
}

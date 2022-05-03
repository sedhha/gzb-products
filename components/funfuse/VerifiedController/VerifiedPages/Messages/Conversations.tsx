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
import { rdb_paths } from '@constants/firebase/paths';
import { rdb } from '@firebase-client/client.config';
import {
  ref as dbref,
  off,
  get,
  onChildAdded,
  set,
  push,
} from 'firebase/database';
import { IFunFuseMessageBox } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
type Props = {
  selfUrl: string;
  recieverUrl: string;
  selfName: string;
  recieverName: string;
  senderUid: string;
  recieverUid: string;
};

export default function Conversations({
  selfUrl,
  recieverUrl,
  selfName,
  recieverName,
  senderUid,
  recieverUid,
}: Props) {
  const [state, dispatch] = React.useReducer(reducer, initState);
  const { conversations, messagesPath, message } = state;

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

  React.useEffect(() => {
    dispatch({
      type: ACTIONTYPES.SET_MESSAGE_PATH,
      payload: `${rdb_paths.funfuse_messages}/${senderUid}__${recieverUid}`,
    });
  }, [senderUid, recieverUid]);

  const onSendHandler = () => {
    if (messagesPath === '') return;
    const messagesRef = dbref(rdb, messagesPath);
    const messageObj: IFunFuseMessageBox = {
      textContent: message,
      senderUid,
      time: new Date().getTime(),
    };

    push(messagesRef, messageObj)
      .then((response) => {
        console.log('Message sent: ', response);
        dispatch({ type: ACTIONTYPES.UPDATE_MESSAGE, payload: '' });
      })
      .catch((eror) => {
        console.log('Error sending message: ', eror);
      });
  };

  React.useEffect(() => {
    if (senderUid !== '' && messagesPath !== '') {
      const messagesRef = dbref(rdb, messagesPath);
      dispatch({ type: ACTIONTYPES.SET_LOADING, payload: true });
      get(messagesRef)
        .then((result) => {
          dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
          console.log('All Data = ', Object.values(result.val()));
        })
        .catch((error) => {
          console.log('Error Occured = ', error);
          dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
        });
      onChildAdded(messagesRef, (snapshot) => {
        console.log('New Child = ', snapshot.val());
      });
      return () => off(messagesRef, 'child_added');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senderUid]);

  return (
    <React.Fragment>
      <div className='flex flex-col items-center flex-auto gap-2 mt-2 overflow-auto'>
        {conversations.map((element) => {
          const fromSelf = element.senderUid === senderUid;
          return (
            <Conversation
              key={element.time}
              name={fromSelf ? selfName : recieverName}
              uri={fromSelf ? state.selfUri : state.recieverUri}
              loading={fromSelf ? state.selfImgLoaded : state.recieverImgLoaded}
              fromSelf={fromSelf}
              textContent={element.textContent}
              time={element.time}
              senderUid={element.senderUid}
            />
          );
        })}
      </div>
      <div className='flex flex-row items-center justify-around gap-2 mt-2'>
        <div className='flex-auto drop-shadow-xl'>
          <input
            className='w-full border-2 outline-none border-t-gray-200 font-funfuse'
            onChange={(e) => {
              dispatch({
                type: ACTIONTYPES.UPDATE_MESSAGE,
                payload: e.target.value,
              });
            }}
          />
        </div>
        <div
          className='h-[2rem] w-[2rem] flex justify-center items-center bg-funfuse rounded-md'
          onClick={() => {
            console.log('Sending');
            onSendHandler();
          }}>
          <div className='funfuse-icons-send h-[1rem] w-[1rem] bg-white' />
        </div>
      </div>
    </React.Fragment>
  );
}

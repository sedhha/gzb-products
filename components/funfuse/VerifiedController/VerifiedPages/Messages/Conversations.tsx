import React, { useRef } from 'react';
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
  push,
  update,
  child,
} from 'firebase/database';
import {
  IFunFuseMessageBox,
  IFunFuseUserMessages,
} from '@constants/interfaces/funfuse/backend/Auth.interfaces';
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
  const lastMessageRef = useRef<HTMLHeadingElement>(null);
  const scrollToBottom = () => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const { conversations, messagesPath, message } = state;
  React.useEffect(() => {
    scrollToBottom();
  }, [conversations.length]);
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
    const uidPath = [senderUid, recieverUid].sort().join('__');
    dispatch({
      type: ACTIONTYPES.SET_MESSAGE_PATH,
      payload: `${rdb_paths.funfuse_messages}/${uidPath}`,
    });
  }, [senderUid, recieverUid]);

  const time = new Date().getTime();

  const onSendHandler = () => {
    if (messagesPath === '' || message === '') return;
    const messagesRef = dbref(rdb, messagesPath);
    const messageObj: IFunFuseMessageBox = {
      textContent: message,
      senderUid,
      time,
    };

    push(messagesRef, messageObj)
      .then(() => {
        dispatch({ type: ACTIONTYPES.UPDATE_MESSAGE, payload: '' });
      })
      .catch((eror) => {
        console.log('Error sending message: ', eror);
      });

    const senderPath = `${rdb_paths.funfuse_user_messages}/${senderUid}/${recieverUid}`;
    const recieverPath = `${rdb_paths.funfuse_user_messages}/${recieverUid}/${senderUid}`;

    const senderRef = dbref(rdb, senderPath);
    const recieverRef = dbref(rdb, recieverPath);

    const latestSenderMessage: IFunFuseUserMessages = {
      textContent: message,
      name: recieverName,
      recieverUid,
      recieverUrl,
      time,
    };
    const latestRecieverMessage: IFunFuseUserMessages = {
      textContent: message,
      name: selfName,
      recieverUid: senderUid,
      recieverUrl: selfUrl,
      time,
    };
    update(senderRef, latestSenderMessage);
    update(recieverRef, latestRecieverMessage);
  };

  React.useEffect(() => {
    if (senderUid !== '' && messagesPath !== '') {
      const messagesRef = dbref(rdb, messagesPath);
      dispatch({ type: ACTIONTYPES.SET_LOADING, payload: true });
      get(messagesRef)
        .then((result) => {
          dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
          if (result.exists()) {
            const incomingData = Object.values(
              result.val()
            ) as IFunFuseMessageBox[];
            const messages = incomingData.sort((a, b) => {
              return a.time - b.time;
            });
            dispatch({
              type: ACTIONTYPES.UPDATE_CONVERSATIONS,
              payload: messages,
            });
          }
        })
        .catch((error) => {
          console.log('Error Occured = ', error);
          dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
        });
      onChildAdded(messagesRef, (snapshot) => {
        const newMessage = snapshot.val();
        dispatch({
          type: ACTIONTYPES.ADD_TO_CONVERSATIONS,
          payload: newMessage as IFunFuseMessageBox,
        });
      });
      return () => off(messagesRef, 'child_added');
    }
  }, [senderUid, messagesPath]);

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
        <div ref={lastMessageRef} />
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
            onKeyPress={(e) => e.key === 'Enter' && onSendHandler()}
            value={state.message}
          />
        </div>
        <div
          className='h-[2rem] w-[2rem] flex justify-center items-center bg-funfuse rounded-md'
          onClick={() => {
            onSendHandler();
          }}>
          <div className='funfuse-icons-send h-[1rem] w-[1rem] bg-white' />
        </div>
      </div>
    </React.Fragment>
  );
}

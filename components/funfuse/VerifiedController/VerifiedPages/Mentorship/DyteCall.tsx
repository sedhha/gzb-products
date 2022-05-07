import ResizeSpinner from '@/components/funfuse/Spinner/ResizeSpinner';
import { ILiveMeetingInterface } from '@immediate-states/funfuse/mentorship.state';
import { endMeetingCall } from '@redux-apis/external/firestoreProfile';
import { useAppSelector } from '@redux-tools/hooks';
import { DyteMeeting, Meeting } from 'dyte-client';

interface Props {
  meeting?: ILiveMeetingInterface;
  updateInCallStatus?: (status: boolean) => void;
}
function DyteScreen(props: Props) {
  const { firebaseToken } = useAppSelector((state) => state.user);
  const meetingEndHandler = () => {
    if (firebaseToken)
      endMeetingCall(firebaseToken).then(() => {
        if (props.updateInCallStatus) props.updateInCallStatus(false);
      });
  };
  const { meeting } = props;
  return meeting ? (
    <div>
      <DyteMeeting
        onInit={(meeting: Meeting) => {
          meeting.on(meeting.Events.meetingEnded, meetingEndHandler);
        }}
        clientId={process.env.NEXT_PUBLIC_DYTE_ORG_ID ?? ''}
        meetingConfig={{
          roomName: meeting.meetingDetails.roomName,
          authToken: meeting.clientDetails.authResponse.authToken,
        }}
      />
    </div>
  ) : (
    <ResizeSpinner />
  );
}

export default DyteScreen;

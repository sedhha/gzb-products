export interface IDyteMeetingData {
  id: string;
  title: string;
  roomName: string;
  status: string;
  createdAt: string;
}

export interface IDyteMeetingDetails {
  success: boolean;
  message: string;
  data: { meeting: IDyteMeetingData };
}

export interface IParticipantInterface {
  userAdded: boolean;
  id: string;
  authToken: string;
}

export interface IParticipantDetails {
  success: boolean;
  message: string;
  data: IParticipantInterface;
}

export interface IDyteParticipant {
  id: string;
  name: string;
  picture: string | null;
  email: string;
  createdAt: string | null;
}

export interface IGetAllParticipants {
  total: number;
  participants: IDyteParticipant[];
}

export interface IAllParticipants {
  success: boolean;
  message: string;
  data: IGetAllParticipants;
}

export interface IFunFuseMentorRDBConfig {
  inAMeeting: boolean;
  meetingDetails: IDyteMeetingData;
  participantDetails?: IParticipantDetails;
  creator_uid: string;
  mentor_uid: string;
  creatorUrl: string;
  mentorUrl: string;
  creatorName: string;
  mentorName: string;
}

export interface IFunFuseInvitePayload {
  creator_uid: string;
  mentor_uid: string;
  creatorUrl: string;
  mentorUrl: string;
  creatorName: string;
  mentorName: string;
}

export interface ILiveMeetingDetails {
  clientDetails: IDyteParticipantCred;
  meetingDetails: IDyteMeetingData;
  name: string;
  url: string;
  uid: string;
  uid2: string;
}

export interface IFunFuseAddToMeeting {
  creator_uid: string;
  mentor_uid: string;
  creatorUrl: string;
  mentorUrl: string;
  creatorName: string;
  mentorName: string;
}

export interface IDyteParticipantPayload {
  clientSpecificId: string;
  userDetails: {
    name: string;
    picture: string;
  };
  roleName: 'participant' | 'host';
}

export interface IDyteParticipantCred {
  authResponse: {
    userAdded: boolean;
    id: string;
    authToken: string;
  };
}

export interface IDyteAddParticipantResponse {
  success: boolean;
  message: string;
  data: IDyteParticipantCred;
}

export interface IDyteTwoParticipantMeeting {
  creator: IDyteParticipantCred;
  mentor: IDyteParticipantCred;
}

/*
{
  "success": true,
  "message": "",
  "data": {
    "meeting": {
      "id": "df9940be-486e-4a58-a567-a90d9f23a4c3",
      "title": "Monday Sprint Planning",
      "roomName": "kxlvxt-gkatsd",
      "status": "LIVE",
      "createdAt": "2022-05-06T15:54:29.860Z",
      "recordOnStart": false,
      "participants": []
    }
  }
}
*/

/*
{
  "success": true,
  "message": "",
  "data": {
    "authResponse": {
      "userAdded": true,
      "id": "9a07d308-59e2-4fa4-9bf0-e02c13466d2e",
      "authToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQxM2EwMzYzLTM1MDEtNDQ2OS04MTdlLTZlMGYyNzYxMzliOSIsImxvZ2dlZEluIjp0cnVlLCJpYXQiOjE2NTE4NTI4NjksImV4cCI6MTY2MDQ5Mjg2OX0.C4u8aCNEOIO5LsldML5QKqnkBltzmW8P89a5uvSiScmjZ6vCTNWH1MCPcS0Y4arPisCIWXYgO7VHoInIWMfQhYcjabPxUNh4ZLTKe06SRaQHVYHVrZWVCtdD7SGCu05XoSfKS6UKRN2dqZeAEG0K70xHAaZkvRp9CXZSyxodDRioBBobI544_o9SqYRIPp74_AI7709x5I0bk38rm3oflhqP_wk9YjcX_ndohV4E__O9Q0UeDs8i5C8_IM6iNRjI46aJoZQVx_uPnns0LMM7-3sILbOw76lskmdfSNPbZrHR9EvUMI-QEySapORFXMbQJsTHPbGiOB58-b7H5ig-mg"
    }
  }
}
*/

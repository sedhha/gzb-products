export interface IRegisterPayload {
  email: string;
  password: string;
}

enum UserGender {
  Male = 'Male',
  Female = 'Female',
  Others = 'Others',
}

export interface INecessaryFields {
  name: string;
  age: number; //In Years
  dobDay: number; //1-31
  dobMonth: number; //1-12
  dobYear: number; //1900-2050
  dobTimeStamp: number; //Timestamp
}

export interface IUserIncomingFieldCompulsory {
  name: string;
  dobString: string;
  gender: UserGender;
}

interface IUserIncomingFieldGeneric {
  profession: string;
  professionLocation: string;
  preferenceGender: UserGender;
  preferenceAgeMin: number;
  preferenceAgeMax: number;
  lng: number;
  lat: number;
  geohash: string;
  bio: string;
  profilePic: string;
  preferenceSkills: string[];
  preferenceInterests: string[];
  selfSkills: string[];
  selfInterests: string[];
  selfPrimarySkill: string;
  selfPrimaryInterest: string;
  discoverability: boolean;
}

export interface UserBackendInjectedVariables {
  userId: string;
  userEmail: string;
  isEmailVerified: boolean;
  isValidUser: boolean;
  userRole: string;
}

export type IUserRegistationForm = IRegisterPayload &
  IUserIncomingFieldCompulsory &
  IUserIncomingFieldGeneric &
  UserBackendInjectedVariables;

interface IUserPresence {
  online: boolean;
  lastSeen: number;
  lastActivelng: number;
  lastActivelat: number;
  lastActivegeohash: string;
  reachScore: number; //- Number of people connected with
  activityScore: number; // - Number of messages sent
  engagementScore: number; // - Number of messages received
  interestRatio: number; // - engagementScore / activityScore
}

//Registration Function Interfaces

export interface IValidRegistration {
  error: boolean;
  message: string;
}

export interface IAgeValidation {
  isAbove13: boolean;
  age: number;
}

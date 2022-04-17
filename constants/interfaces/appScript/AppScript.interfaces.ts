export interface IAppScriptResponse {
  error: boolean;
  status_code: number;
  message: string;
  payload: any;
}

export const operationTypes = {
  sendEmail: 'sendEmail',
} as const;
export type AppScriptOpType = keyof typeof operationTypes;

export interface IAppScriptEmail {
  to: string;
  subject: string;
  htmlBody: string;
  name?: string;
  replyTo?: string;
}

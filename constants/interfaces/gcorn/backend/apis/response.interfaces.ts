export interface IResponse {
  status_code: number;
  message: string;
  data: any;
  error: boolean;
  access_allowed: boolean;
  session_expired: boolean;
}

export interface IResponseCook {
  status_code?: number;
  message?: string;
  data?: any;
  access_allowed?: boolean;
  session_expired?: boolean;
}

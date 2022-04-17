import {
  IAppScriptResponse,
  AppScriptOpType,
} from '@constants/interfaces/appScript/AppScript.interfaces';

const generateAppScriptResponse = (message: any) => ({
  status_code: 500,
  error: true,
  message: `${message}`,
  payload: {},
});

const errorHandler = (error: any) => {
  console.log(error);
  return generateAppScriptResponse(error);
};
export const performAppScriptOperations = async (
  operationType: AppScriptOpType,
  operationProps: any
): Promise<IAppScriptResponse> =>
  fetch(
    `https://script.google.com/macros/s/${process.env.APPSCRIPT_DEPLOYMENT_URL}/exec`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operationType,
        operationProps,
        apiKey: process.env.APPSCRIPT_API_KEY,
      }),
    }
  )
    .then((res) =>
      res
        .json()
        .then((data) => {
          if (data.error) errorHandler(data.message);
          return data as IAppScriptResponse;
        })
        .catch(errorHandler)
    )
    .catch(errorHandler);

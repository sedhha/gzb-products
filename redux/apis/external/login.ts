export const loginUserWithToken = async (token: string) =>
  fetch('/api/funfuse/auth/login-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firebaseToken: token }),
  }).then((response) => response.json());

export const disconnectFireStoreUser = async (token: string) =>
  fetch('/api/funfuse/ops/disconnect-user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });


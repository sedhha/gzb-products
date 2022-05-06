const createDyteMeeting = async () => {
  fetch(
    `https://api.cluster.dyte.in/v1/organizations/${process.env.DYTE_ORG_ID}/meeting`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.DYTE_API_KEY ?? '',
      },
      body: JSON.stringify({
        title: 'Monday Sprint Planning',
        authorization: {
          waitingRoom: true,
        },
      }),
    }
  )
    .then(async (response) => {
      console.log('Status code = ', response.status);
      console.log(await response.json());
    })
    .catch((error) => {
      console.log('Error Occured = ', error);
    });
};

const dyteUtils = {
  createDyteMeeting,
};

export default dyteUtils;

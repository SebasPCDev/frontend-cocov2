import axios from 'axios';

interface IParams {
  token: string | undefined;
  params: {
    status: string | null | undefined;
    type: string | null | undefined;
  };
}

const urlBase = process.env.NEXT_PUBLIC_API_URL;

const GetRequests = async ({ token, params }: IParams) => {
  const url = `${urlBase}/requests`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    });

    return response.data;
  } catch (error) {
    console.log('hay un error', error);
  }
};

export default GetRequests;

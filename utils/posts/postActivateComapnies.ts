import axios from 'axios';
import ICompaniesInfo from '../types/requests/companiesFormInterface';
const urlBase = process.env.NEXT_PUBLIC_API_URL;

const PostActivateCompany = async ({
  Id,
  token,
}: {
  Id: string;
  token: string | undefined;
}) => {
  const url = `${urlBase}/companies/activate`;
  const objetId = {
    id: Id,
  };

  try {
    const response = await axios.post(url, objetId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    let message = '';
    if (error.response.data.message) {
      message = error.response.data.message;
    } else {
      message = error.message;
    }
    throw message;
  }
};

export default PostActivateCompany;

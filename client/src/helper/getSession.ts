import axios from 'axios';

export const getSession = async () => {
  const response = await axios.get(`/api/sessions/`);
  return response.data?.email;
};

import axios from 'axios';
import { parse } from 'path';

export const getSession = async () => {
  const response = await axios.get(`/api/sessions/`);
  return response.data?.email;
};

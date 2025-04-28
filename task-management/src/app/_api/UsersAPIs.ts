import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const GET_USERS_FROM_EMAIL_API = `${API_URL}/api/user/email`;

export const getUsersFromEmailAPI = async (email: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    GET_USERS_FROM_EMAIL_API,
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("Response from getUsersFromEmailAPI:", response.data);
  return response.data;
};
